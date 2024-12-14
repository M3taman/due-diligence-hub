const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Recent Research</h3>
          <p className="text-gray-600">No recent research documents</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
          <p className="text-gray-600">No active clients</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <p className="text-gray-600">No pending tasks</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;