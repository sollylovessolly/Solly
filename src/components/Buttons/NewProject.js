import React from 'react';

const NewProject = () => {
    // Inline styles
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'cyan',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    };

    const iconStyle = {
        marginRight: '10px',
        fontSize: '20px',
    };

    const handleMouseOver = (e) => {
        e.target.style.backgroundColor = '#00bcd4'; // Darker cyan on hover
    };

    const handleMouseOut = (e) => {
        e.target.style.backgroundColor = 'cyan';
    };

    // onClick handler
    const handleClick = () => {
        // Add your onClick functionality here
        console.log('Button clicked!');
    };

    return (
        <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
        >
            <span style={iconStyle}>+</span>
            New Project
        </button>
    );
};

export default NewProject;
