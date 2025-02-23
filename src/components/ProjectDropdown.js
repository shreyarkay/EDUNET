import React, { useState } from 'react'
import { useEffect } from 'react'
import { Popover } from '@headlessui/react'
import axios from "axios"
import toast from 'react-hot-toast'
import AddProjectModal from './AddProjectModal'
const ProjectDropdown = ({ id, navigate }) => {
    const [project, setProject] = useState({});
    
    useEffect(() => {
        axios.get(`http://localhost:9000/project/${id}`)
            .then(res => {
                console.log("Project Data:", res.data);
                setProject(res.data[0] || {});
            })
            .catch(err => console.error("Error fetching project details", err));
    }, [id]);
    
    return (
        <div className="dropdown">
            <span>Project: {project.title}</span>
            <span>Status: {project.status}</span>
            <span>Priority: {project.priority}</span>
            <span>Deadline: {project.deadline}</span>
            <span>Owner: {project.owner}</span>
        </div>
    );
};

export default ProjectDropdown;