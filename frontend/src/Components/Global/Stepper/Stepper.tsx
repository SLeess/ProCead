import React, { useContext, useState } from 'react';
import './Stepper.css';

interface StepProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}

const Step = ({ icon: IconComponent, label, isActive, isCompleted, onClick }: StepProps) => {
    const statusClass = isActive
        ? 'step-active'
        : isCompleted
            ? 'step-completed'
            : 'step-future';

    return (
        <button onClick={onClick} className={`step-item ${statusClass}`}> {/* Mudado para button para ser clicável */}
            <div className="step-icon-wrapper">
                {IconComponent}
            </div>
            <p className="step-label mb-3 md:mb-0">{label}</p>
        </button>
    );
};

interface TabItem {
    label: string;
    icon: React.ReactNode;
}

interface StepperProps {
    tabsData: TabItem[];
    activeTabIndex: number;
    enabledTabs: Array<string>;
    setActiveTabIndex: (index: number) => void;
}



export default function Stepper({ tabsData, activeTabIndex, setActiveTabIndex, enabledTabs }: StepperProps){
    return (
       <>
            {
                tabsData.map((tab, index) => 
                    
                    <React.Fragment key={tab.label}>
                        <Step
                            icon={
                                React.cloneElement(tab.icon, {
                                    className: 'step-icon',
                                })
                            }
                            onClick={() => enabledTabs.includes(tab.label) ? setActiveTabIndex(index) : console.log("desabilitado")}
                            label={tab.label}
                            isActive={index === activeTabIndex}
                            isCompleted={index < activeTabIndex}
                        />
                        {/* Adiciona a linha de conexão se não for o último item */}
                        {index < tabsData.length - 1 && (
                            <div className={`timeline-connector 
                                ${index < activeTabIndex ? 'connector-completed' : 'connector-future'}
                            `}></div>
                        )}
                    </React.Fragment>
                )
            }
       </>
    )
};