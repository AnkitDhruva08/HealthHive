// frontend/src/components/StreamlitDashboard.tsx
import React from "react";

const StreamlitDashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      
      <main className="flex-1">
        <iframe
          src="http://localhost:8502"
          className="w-full h-full border-0"
          title="Streamlit HAR Dashboard"
        />
      </main>
    </div>
  );
};

export default StreamlitDashboard;
