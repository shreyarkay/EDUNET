import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProjectModal = ({ id, closeModal }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('new');
    const [priority, setPriority] = useState('medium');
    const [deadline, setDeadline] = useState('');
    const [owner, setOwner] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        axios.get(`http://localhost:9000/project/${id}`)
            .then(res => {
                setTitle(res.data[0].title);
                setStatus(res.data[0].status || 'new');
                setPriority(res.data[0].priority || 'medium');
                setDeadline(res.data[0].deadline || '');
                setOwner(res.data[0].owner || '');
                setDescription(res.data[0].description || '');
            })
            .catch(() => console.error('Error fetching project data'));
    }, [id]);
    
    const handleSave = () => {
        axios.put(`http://localhost:9000/project/${id}`, { title, status, priority, deadline, owner, description })
            .then(() => {
                closeModal();
                window.dispatchEvent(new Event('projectUpdate'));
            })
            .catch(() => console.error('Error updating project details'));
    };
    
    return (
        <div className="modal">
            <h2>Edit Project</h2>
            <label>Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <label>Priority:
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <label>Deadline:
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </label>
            <label>Owner:
                <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
            </label>
            <label>Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default EditProjectModal;