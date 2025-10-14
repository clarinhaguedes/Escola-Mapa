// js/scripts.js - Código para a página do mapa

// Verifica se estamos na página do mapa
if (document.getElementById('school-map')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeMap();
    });
}

function initializeMap() {
    // Configurar filtro de capacidade
    const capacityFilter = document.getElementById('capacity-filter');
    if (capacityFilter) {
        capacityFilter.addEventListener('change', renderMap);
    }
    
    // Configurar botão de redefinir
    const resetButton = document.getElementById('reset-map');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (capacityFilter) capacityFilter.value = 'all';
            renderMap();
        });
    }
    
    // Renderizar mapa inicial
    renderMap();
}

function renderMap() {
    const capacityFilter = document.getElementById('capacity-filter');
    const capacity = capacityFilter ? capacityFilter.value : 'all';
    const mapElement = document.getElementById('school-map');
    
    // Limpar mapa
    mapElement.innerHTML = '';
    
    // Dados de exemplo (em um sistema real viriam do servidor)
    const sampleSchools = [
        { name: "Escola Municipal São Paulo", students: 350, teachers: 25, address: "Rua das Flores, 123" },
        { name: "Colégio Estadual Jardins", students: 800, teachers: 45, address: "Av. Paulista, 1000" },
        { name: "Escola Rural Santa Maria", students: 80, teachers: 8, address: "Estrada do Sertão, km 15" }
    ];
    
    // Filtrar escolas por capacidade
    const filteredSchools = sampleSchools.filter(school => {
        if (capacity === 'all') return true;
        if (capacity === 'low') return school.students <= 100;
        if (capacity === 'medium') return school.students > 100 && school.students <= 500;
        if (capacity === 'high') return school.students > 500;
        return true;
    });
    
    if (filteredSchools.length === 0) {
        mapElement.innerHTML = '<div class="map-placeholder"><p>Nenhuma escola encontrada</p></div>';
        return;
    }
    
    // Criar elementos do mapa (simulação)
    const mapContent = document.createElement('div');
    mapContent.className = 'map-content';
    mapContent.style.position = 'relative';
    mapContent.style.width = '100%';
    mapContent.style.height = '100%';
    mapContent.style.backgroundImage = 'linear-gradient(to right, #a8e6cf, #dcedc1)';
    mapContent.style.backgroundSize = 'cover';
    mapContent.style.borderRadius = 'var(--border-radius)';
    
    // Adicionar marcadores para cada escola
    filteredSchools.forEach(school => {
        const marker = createMapMarker(school);
        mapContent.appendChild(marker);
    });
    
    mapElement.appendChild(mapContent);
}

function createMapMarker(school) {
    const marker = document.createElement('div');
    marker.className = 'school-marker';
    marker.style.position = 'absolute';
    
    // Posicionar aleatoriamente no mapa
    marker.style.left = `${30 + Math.random() * 60}%`;
    marker.style.top = `${30 + Math.random() * 60}%`;
    
    // Definir cor baseada na capacidade
    let color, size;
    if (school.students <= 100) {
        color = '#e74c3c';
        size = '15px';
    } else if (school.students <= 500) {
        color = '#f39c12';
        size = '20px';
    } else {
        color = '#2ecc71';
        size = '25px';
    }
    
    marker.style.width = size;
    marker.style.height = size;
    marker.style.backgroundColor = color;
    marker.style.borderRadius = '50%';
    marker.style.border = '2px solid white';
    marker.style.cursor = 'pointer';
    marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    marker.style.transition = 'transform 0.2s';
    
    // Efeito hover
    marker.addEventListener('mouseenter', () => {
        marker.style.transform = 'scale(1.2)';
    });
    
    marker.addEventListener('mouseleave', () => {
        marker.style.transform = 'scale(1)';
    });
    
    // Tooltip com informações
    marker.title = `${school.name}\nAlunos: ${school.students}\nProfessores: ${school.teachers}`;
    
    // Evento de clique
    marker.addEventListener('click', () => {
        alert(`Escola: ${school.name}\nEndereço: ${school.address}\nAlunos: ${school.students}\nProfessores: ${school.teachers}`);
    });
    
    return marker;
}