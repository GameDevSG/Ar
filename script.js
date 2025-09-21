const plantInfo = {
    Ahwagandha: {
        name: "Ashwagandha",
        info: "Ashwagandha is an ancient medicinal herb. It's classified as an adaptogen, meaning it can help your body manage stress."
    },
    Cardamom: {
        name: "Cardamom",
        info: "Cardamom is known for its strong aroma and is commonly used in traditional medicine for digestive issues and oral health."
    },
    Cinnamon: {
        name: "Cinnamon",
        info: "Cinnamon is loaded with antioxidants and has anti-inflammatory properties. It can help regulate blood sugar levels."
    },
    clove: {
        name: "Clove",
        info: "Cloves contain powerful antioxidants and have antibacterial properties. They're traditionally used for dental pain and digestive issues."
    },
    tulsi: {
        name: "Tulsi (Holy Basil)",
        info: "Tulsi is considered a sacred plant in Ayurveda. It has adaptogenic properties and helps combat stress and boost immunity."
    },
    Turmeric: {
        name: "Turmeric",
        info: "Turmeric contains curcumin, a powerful anti-inflammatory compound. It's known for its antioxidant properties and potential health benefits."
    }
};

let currentModel = null;

// Function to update the info card with plant details
function updatePlantInfo(name, info) {
    const infoCard = document.getElementById('plantInfo');
    infoCard.innerHTML = `
        <h2>${name}</h2>
        <p>${info}</p>
    `;
}

// Function to load and display a model
function loadModel(modelName) {
    const container = document.getElementById('model-container');
    
    // Remove existing model if any
    if (currentModel) {
        container.removeChild(currentModel);
    }

    // Create new model entity
    currentModel = document.createElement('a-entity');
    currentModel.setAttribute('gltf-model', `models/${modelName}.glb`);
    currentModel.setAttribute('position', '0 0 0');
    currentModel.setAttribute('rotation', '-90 0 0');
    currentModel.setAttribute('scale', '0.5 0.5 0.5');
    
    container.appendChild(currentModel);
}

// Movement and rotation values
const MOVE_DISTANCE = 0.1;
const ROTATION_ANGLE = 15;
const SCALE_FACTOR = 1.2;

document.addEventListener('DOMContentLoaded', () => {
    const plantSelector = document.getElementById('plantSelector');
    const container = document.getElementById('model-container');

    // Handle plant selection
    plantSelector.addEventListener('change', (e) => {
        const selectedPlant = e.target.value;
        if (selectedPlant) {
            loadModel(selectedPlant);
            updatePlantInfo(plantInfo[selectedPlant].name, plantInfo[selectedPlant].info);
        }
    });

    // Movement controls
    document.getElementById('moveLeft').addEventListener('click', () => {
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x - MOVE_DISTANCE} ${pos.y} ${pos.z}`);
    });

    document.getElementById('moveRight').addEventListener('click', () => {
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x + MOVE_DISTANCE} ${pos.y} ${pos.z}`);
    });

    document.getElementById('moveForward').addEventListener('click', () => {
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x} ${pos.y} ${pos.z - MOVE_DISTANCE}`);
    });

    document.getElementById('moveBack').addEventListener('click', () => {
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x} ${pos.y} ${pos.z + MOVE_DISTANCE}`);
    });

    // Rotation controls
    document.getElementById('rotateLeft').addEventListener('click', () => {
        if (currentModel) {
            const rot = currentModel.getAttribute('rotation');
            currentModel.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z - ROTATION_ANGLE}`);
        }
    });

    document.getElementById('rotateRight').addEventListener('click', () => {
        if (currentModel) {
            const rot = currentModel.getAttribute('rotation');
            currentModel.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z + ROTATION_ANGLE}`);
        }
    });

    // Scale controls
    document.getElementById('scaleUp').addEventListener('click', () => {
        if (currentModel) {
            const scale = currentModel.getAttribute('scale');
            currentModel.setAttribute('scale', 
                `${scale.x * SCALE_FACTOR} ${scale.y * SCALE_FACTOR} ${scale.z * SCALE_FACTOR}`);
        }
    });

    document.getElementById('scaleDown').addEventListener('click', () => {
        if (currentModel) {
            const scale = currentModel.getAttribute('scale');
            currentModel.setAttribute('scale', 
                `${scale.x / SCALE_FACTOR} ${scale.y / SCALE_FACTOR} ${scale.z / SCALE_FACTOR}`);
        }
    });
});