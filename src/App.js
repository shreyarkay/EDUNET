import AppLayout from "./components/AppLayout";
import { Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import { Toaster } from "react-hot-toast";

const teamMembers = ["Alice", "Bob", "Charlie", "David"]; // ✅ Team members list

function App() {
  console.log('render app..');

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <AppLayout>
          <Toaster position="top-right" gutter={8} />

          <Routes>
            <Route path="/:projectId" element={<Task />} />
            <Route path="/" element={
              <div className="flex flex-col items-center w-full pt-10">
                <img src="./image/welcome.svg" className="w-5/12" alt="" />
                <h1 className="text-lg text-gray-600">Select or create new project</h1>
              </div>
            } />
          </Routes>
        </AppLayout>
      </div>

      {/* ✅ Team Members Section (Right Sidebar) */}
      <div className="w-64 bg-gray-100 p-6 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Team Members</h2>
        <div className="space-y-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow">
              {member}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
