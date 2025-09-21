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

let currentMarkerlessModel = null;
let currentMarkerModel = null;
let isMarkerMode = false;

// Function to update the info card with plant details
function updatePlantInfo(name, info) {
    const infoCard = document.getElementById('plantInfo');
    infoCard.innerHTML = `
        <h2>${name}</h2>
        <p>${info}</p>
    `;
}

// Function to toggle between AR modes
function toggleARMode() {
    isMarkerMode = !isMarkerMode;
    const markerlessScene = document.getElementById('markerlessScene');
    const markerScene = document.getElementById('markerScene');
    const modeButton = document.getElementById('arMode');

    if (isMarkerMode) {
        markerlessScene.classList.add('scene-hidden');
        markerScene.classList.remove('scene-hidden');
        modeButton.textContent = 'Switch to Markerless AR';
    } else {
        markerlessScene.classList.remove('scene-hidden');
        markerScene.classList.add('scene-hidden');
        modeButton.textContent = 'Switch to Marker AR';
    }
}

// Function to load and display a model
function loadModel(modelName) {
    // Load model for markerless scene
    const markerlessContainer = document.getElementById('markerless-container');
    if (currentMarkerlessModel) {
        markerlessContainer.removeChild(currentMarkerlessModel);
    }
    currentMarkerlessModel = document.createElement('a-entity');
    currentMarkerlessModel.setAttribute('gltf-model', `models/${modelName}.glb`);
    currentMarkerlessModel.setAttribute('position', '0 0 -2');
    currentMarkerlessModel.setAttribute('scale', '0.5 0.5 0.5');
    currentMarkerlessModel.setAttribute('rotation', '-90 0 0');
    currentMarkerlessModel.setAttribute('look-at', '[camera]');
    markerlessContainer.appendChild(currentMarkerlessModel);

    // Load model for marker-based scene
    const markerContainer = document.getElementById('marker-container');
    if (currentMarkerModel) {
        markerContainer.removeChild(currentMarkerModel);
    }
    currentMarkerModel = document.createElement('a-entity');
    currentMarkerModel.setAttribute('gltf-model', `models/${modelName}.glb`);
    currentMarkerModel.setAttribute('position', '0 0.5 0');
    currentMarkerModel.setAttribute('scale', '0.2 0.2 0.2');
    currentMarkerModel.setAttribute('rotation', '0 0 0');
    markerContainer.appendChild(currentMarkerModel);
}

// Movement and rotation values
const MOVE_DISTANCE = 0.1;
const ROTATION_ANGLE = 15;
const SCALE_FACTOR = 1.2;

document.addEventListener('DOMContentLoaded', () => {
    const plantSelector = document.getElementById('plantSelector');
    const markerlessContainer = document.getElementById('markerless-container');
    const markerContainer = document.getElementById('marker-container');
    
    // Initialize AR mode toggle
    document.getElementById('arMode').addEventListener('click', toggleARMode);

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
        const container = isMarkerMode ? markerContainer : markerlessContainer;
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x - MOVE_DISTANCE} ${pos.y} ${pos.z}`);
    });

    document.getElementById('moveRight').addEventListener('click', () => {
        const container = isMarkerMode ? markerContainer : markerlessContainer;
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x + MOVE_DISTANCE} ${pos.y} ${pos.z}`);
    });

    document.getElementById('moveForward').addEventListener('click', () => {
        const container = isMarkerMode ? markerContainer : markerlessContainer;
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x} ${pos.y} ${pos.z - MOVE_DISTANCE}`);
    });

    document.getElementById('moveBack').addEventListener('click', () => {
        const container = isMarkerMode ? markerContainer : markerlessContainer;
        const pos = container.getAttribute('position');
        container.setAttribute('position', `${pos.x} ${pos.y} ${pos.z + MOVE_DISTANCE}`);
    });

    // Rotation controls
    document.getElementById('rotateLeft').addEventListener('click', () => {
        const currentModel = isMarkerMode ? currentMarkerModel : currentMarkerlessModel;
        if (currentModel) {
            const rot = currentModel.getAttribute('rotation');
            currentModel.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z - ROTATION_ANGLE}`);
        }
    });

    document.getElementById('rotateRight').addEventListener('click', () => {
        const currentModel = isMarkerMode ? currentMarkerModel : currentMarkerlessModel;
        if (currentModel) {
            const rot = currentModel.getAttribute('rotation');
            currentModel.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z + ROTATION_ANGLE}`);
        }
    });

    // Scale controls
    document.getElementById('scaleUp').addEventListener('click', () => {
        const currentModel = isMarkerMode ? currentMarkerModel : currentMarkerlessModel;
        if (currentModel) {
            const scale = currentModel.getAttribute('scale');
            currentModel.setAttribute('scale', 
                `${scale.x * SCALE_FACTOR} ${scale.y * SCALE_FACTOR} ${scale.z * SCALE_FACTOR}`);
        }
    });

    document.getElementById('scaleDown').addEventListener('click', () => {
        const currentModel = isMarkerMode ? currentMarkerModel : currentMarkerlessModel;
        if (currentModel) {
            const scale = currentModel.getAttribute('scale');
            currentModel.setAttribute('scale', 
                `${scale.x / SCALE_FACTOR} ${scale.y / SCALE_FACTOR} ${scale.z / SCALE_FACTOR}`);
        }
    });
});