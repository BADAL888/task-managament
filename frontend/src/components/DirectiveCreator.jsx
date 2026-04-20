import React, { useState } from 'react';
import { createTask } from '../services/api';

const DirectiveCreator = ({ onMissionInjected }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Technical');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setIsProcessing(true);
        try {
            await createTask({ title, description, priority, category });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setCategory('Technical');
            onMissionInjected();
        } catch (err) {
            console.error('Initialization failed:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="directive-panel">
            <div className="panel-inner">
                <div className="directive-content">
                    <form onSubmit={handleSubmission} className="directive-form">
                        <h2 className="panel-title">Initialize Directive</h2>
                        
                        <div className="input-group">
                            <span className="input-icon">01</span>
                            <input
                                type="text"
                                placeholder="Heading..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-icon">02</span>
                            <textarea
                                placeholder="Operational brief..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="segment-section">
                            <label>Priority Matrix:</label>
                            <div className="segment-group">
                                {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                                    <button 
                                        key={p}
                                        type="button"
                                        className={`segment-item ${priority === p ? 'active' : ''}`}
                                        onClick={() => setPriority(p)}
                                    >{p}</button>
                                ))}
                            </div>
                        </div>

                        <div className="segment-section">
                            <label>Operational Domain:</label>
                            <div className="segment-group color-segments">
                                {['Technical', 'Admin', 'Research', 'Strategy'].map(c => (
                                    <button 
                                        key={c}
                                        type="button"
                                        className={`segment-item cat-${c.toLowerCase()} ${category === c ? 'active' : ''}`}
                                        onClick={() => setCategory(c)}
                                    >{c}</button>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="action-alt" onClick={() => {setTitle(''); setDescription('');}}>
                                Reset Parameters
                            </button>
                            <button type="submit" className="action-primary" disabled={isProcessing}>
                                {isProcessing ? 'Processing...' : 'Deploy Directive'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="directive-visual">
                    <img src="/neural_grid.png" alt="Neural Grid Operational View" />
                </div>
            </div>
        </div>
    );
};

export default DirectiveCreator;
