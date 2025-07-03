import React, { useState } from 'react'

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('alta'); // valor por defecto
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // no recarga la página al enviar el formulario

        if (!title.trim()) {
            setError('El título es obligatorio'); // validación frontend
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, priority }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Error al crear la tarea');
                return;
            }

            const data = await res.json();
            onTaskCreated(data); // notifica al padre para recargar tareas
            setTitle('');
            setPriority('alta'); // valor por defecto
            setError('');
        } catch (err) {
            setError('Error de red');
        }
    };
    return (
        <form onSubmit={handleSubmit} className='flex justify-center flex-col w-1/2 mx-auto gap-4'>
            <h1 className='font-bold text-white uppercase text-center text-xl mb-2'>Agregar Tarea</h1>
            <input
                type="text"
                placeholder='Título'
                className='px-2 bg-white mx-auto border w-xs rounded-md h-8'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <select
                name="Prioridad"
                id=""
                className='border bg-white px-2 mx-auto w-xs rounded-md h-8'
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
            {error && <p className="text-red-500 uppercase font-bold text-md mx-auto">{error}</p>}
            <button type="submit" className="bg-blue-600 mx-auto w-30 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-2xl">
                Agregar
            </button>

        </form>
    )
}

export default TaskForm