import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskModal = ({ isOpen, setIsOpen, id }) => {
    const [taskData, setTaskData] = useState({});
    const [projectData, setProjectData] = useState({});

    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };

    useEffect(() => {
        if (isOpen) {
            axios.get(`http://localhost:9000/project/${id.projectId}/task/${id.id}`)
                .then((data) => {
                    setTaskData({ ...data.data[0].task[0] });
                })
                .catch(() => toast.error('Something went wrong fetching task details'));

            axios.get(`http://localhost:9000/project/${id.projectId}`)
                .then((data) => {
                    setProjectData({ ...data.data[0] });
                })
                .catch(() => toast.error('Something went wrong fetching project details'));
        }
    }, [isOpen]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4 w-screen h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="rounded-md bg-white max-w-[85%] w-[85%] h-[85%] overflow-y-hidden">
                                <Dialog.Title as='div' className='bg-white shadow px-6 py-4 rounded-t-md sticky top-0 flex justify-between items-center'>
                                    <h1>Task Details</h1>
                                    <button onClick={() => setIsOpen(false)} className='text-gray-500 hover:bg-gray-100 rounded focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-500/30'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dialog.Title>
                                <div className='flex gap-4 h-[inherit]'>
                                    <div className="!w-8/12 px-8 space-y-3 py-4 min-h-max overflow-y-auto">
                                        <h1 className='text-3xl font-semibold'>{capitalizeFirstLetter(taskData.title)}</h1>
                                        <p className='text-gray-600'>{capitalizeFirstLetter(taskData.description)}</p>
                                        
                                        {/* Project Details */}
                                        <div className="mt-4">
                                            <h3 className='text-lg font-medium'>Project Details</h3>
                                            <p><strong>Project:</strong> {projectData.title || "N/A"}</p>
                                            <p><strong>Status:</strong> {projectData.status || "N/A"}</p>
                                            <p><strong>Priority:</strong> {projectData.priority || "N/A"}</p> {/* ✅ Display Priority */}
                                            <p><strong>Deadline:</strong> {projectData.deadline || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="w-4/12 py-4 pr-4">
                                        {/* Additional content can go here */}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TaskModal;
