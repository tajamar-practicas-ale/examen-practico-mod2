from flask import Flask
from flask_cors import CORS
from models.task import db
from routes.task_routes import task_bp

app = Flask(__name__)
CORS(app)

# Configuración de base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///task.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Registrar blueprint
app.register_blueprint(task_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)