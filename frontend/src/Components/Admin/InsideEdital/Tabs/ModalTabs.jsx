import React from "react";
import { useState } from "react";

const ModalTabs = ({tabs, activeTab, setActiveTab}) => {

    return (
        <div id="tabs-container">
            <nav id="tabs-navs" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        type="button"
                        id="tabs-nav-button"
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${activeTab === tab
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ModalTabs;