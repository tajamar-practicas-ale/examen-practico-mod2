import { useEffect, useState } from 'react';

export default function TaskList({ reloadTrigger }) {
    const [tasks, setTasks] = useState([]); // almacena las tareas cargadas
    const [filter, setFilter] = useState(''); // controlar filtro

    // traer tareas
    const fetchTasks = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/tasks${filter ? '?priority=' + filter : ''}`);
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Error cargando tareas:', err);
        }
    };

    // eliminar tarea
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
        fetchTasks(); // Recarga tareas después de eliminar
    };

    // carga tareas al iniciar o cuando se cambia el filtro (alta, media o baja)
    useEffect(() => {
        fetchTasks();
    }, [reloadTrigger, filter]);

    return (
        <div className="mt-6 p-4 bg-white w-1/2 mx-auto rounded shadow-md">

            {/* FILTRO */}
            <div className="flex gap-2 mb-4">
                {['', 'alta', 'media', 'baja'].map((level) => (
                    <button
                        key={level || 'all'}
                        onClick={() => setFilter(level)} // actualiza el filtro
                        className={`px-3 py-1 cursor-pointer rounded transition-all duration-200 ${filter === level
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                    >
                        {level ? level.charAt(0).toUpperCase() + level.slice(1) : 'Todas'}
                    </button>
                ))}
            </div>

            {/* LISTAR TAREAS */}
            {tasks.length === 0 ? (
                <p className="text-gray-500">No hay tareas.</p>
            ) : (
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li key={task.id} className="flex justify-between items-center border p-2 rounded">
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-600">Prioridad: {task.priority}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer transition-all duration-200"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
