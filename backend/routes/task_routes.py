from flask import Blueprint, request, jsonify
from models.task import db, Task

task_bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')

# GET /api/tasks?priority=...
@task_bp.route('', methods=['GET'])
def get_tasks():
    priority = request.args.get('priority')
    if priority:
        tasks = Task.query.filter_by(priority=priority).all()
    else:
        tasks = Task.query.all()
    return jsonify([{'id': t.id, 'title': t.title, 'priority': t.priority} for t in tasks])

# POST /api/tasks
@task_bp.route('', methods=['POST'])
def create_task():
    data = request.get_json()
    title = data.get('title', '').strip()
    priority = data.get('priority', '').strip()

    if not title:
        return jsonify({'error': 'El título es obligatorio'}), 400

    task = Task(title=title, priority=priority)
    db.session.add(task)
    db.session.commit()
    return jsonify({'id': task.id, 'title': task.title, 'priority': task.priority}), 201

# DELETE /api/tasks/<id>
@task_bp.route('/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': 'Tarea no encontrada'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Tarea eliminada'}), 200
