import React from 'react';
import { updateTask, deleteTask } from '../services/api';

const DirectiveView = ({ items, onOperationUpdate }) => {
    
    const triggerStateShift = async (mission) => {
        try {
            const nextStatus = mission.status === 'Pending' ? 'Completed' : 'Pending';
            await updateTask(mission._id, { status: nextStatus });
            onOperationUpdate();
        } catch (err) {
            console.error('State shift failed:', err);
        }
    };

    const runPurgeProtocol = async (id) => {
        if (!window.confirm('Execute purge protocol for this directive?')) return;
        try {
            await deleteTask(id);
            onOperationUpdate();
        } catch (err) {
            console.error('Purge failed:', err);
        }
    };

    if (items.length === 0) {
        return <div className="void-state">No active directives in registry.</div>;
    }

    return (
        <div className="registry-grid">
            {items.map((mission) => (
                <div key={mission._id} className={`mission-case ${mission.status.toLowerCase()}`}>
                    <div className="case-header">
                        <div className="case-meta">
                            <span className={`tag priority-${mission.priority.toLowerCase()}`}>
                                {mission.priority}
                            </span>
                            <span className="tag category">
                                {mission.category}
                            </span>
                        </div>
                        <div className={`status-orb ${mission.status.toLowerCase()}`}></div>
                    </div>

                    <div className="case-body">
                        <h3 className="case-heading">{mission.title}</h3>
                        <p className="case-brief">{mission.description}</p>
                    </div>

                    <div className="case-footer">
                        <div className="timestamp">
                            Initialized: {new Date(mission.createdAt).toLocaleDateString()}
                        </div>
                        <div className="action-hub">
                            <button 
                                className="hub-btn toggle"
                                onClick={() => triggerStateShift(mission)}
                            >
                                {mission.status === 'Pending' ? 'Complete' : 'Reopen'}
                            </button>
                            <button 
                                className="hub-btn purge"
                                onClick={() => runPurgeProtocol(mission._id)}
                            >
                                Purge
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DirectiveView;
