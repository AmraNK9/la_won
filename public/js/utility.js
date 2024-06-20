// Get the current URL
const url = new URL(window.location.href);

// Get the search parameters from the URL
const searchParams = new URLSearchParams(url.search);

// Function to get a specific parameter by name
function getParam(paramName) {
    return searchParams.get(paramName);
}


function copyToClipboard(text) {
    // Check if the Clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Optionally, you can notify the user that the text has been copied
                console.log('Text copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy text', err);
            });
    } else {
        // Fallback for browsers that do not support the Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text', err);
        }
        document.body.removeChild(textarea);
    }
}

// Example usage: copy some text


export {getParam,copyToClipboard};


