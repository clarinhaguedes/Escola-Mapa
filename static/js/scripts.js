// js/scripts.js

// Componentes reutilizáveis
class Component {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }
    
    show() {
        this.element.style.display = 'block';
    }
    
    hide() {
        this.element.style.display = 'none';
    }
}

class SchoolManager extends Component {
    constructor() {
        super('school-form');
        this.schools = JSON.parse(localStorage.getItem('schools')) || [];
        this.init();
    }
    
    init() {
        // Carregar escolas salvas
        this.loadSchools();
        
        // Configurar evento do formulário
        if (this.element) {
            this.element.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(e.target);
        const infrastructure = [];
        
        // Coletar checkboxes de infraestrutura
        document.querySelectorAll('input[name="infrastructure"]:checked').forEach(checkbox => {
            infrastructure.push(checkbox.value);
        });
        
        // Criar objeto escola
        const school = {
            id: Date.now(), // ID único baseado no timestamp
            name: document.getElementById('school-name').value,
            address: document.getElementById('school-address').value,
            students: parseInt(document.getElementById('students-count').value),
            teachers: parseInt(document.getElementById('teachers-count').value),
            infrastructure: infrastructure,
            // Coordenadas simuladas (em um sistema real, usaríamos geocodificação)
            lat: -23.5505 + (Math.random() - 0.5) * 0.1,
            lng: -46.6333 + (Math.random() - 0.5) * 0.1
        };
        
        // Adicionar escola
        this.addSchool(school);
        
        // Limpar formulário
        e.target.reset();
        
        // Mostrar mensagem de sucesso
        alert('Escola cadastrada com sucesso!');
        
        // Navegar para o mapa
        navigateTo('map');
    }
    
    addSchool(school) {
        this.schools.push(school);
        this.saveSchools();
        this.updateUI();
    }
    
    saveSchools() {
        localStorage.setItem('schools', JSON.stringify(this.schools));
    }
    
    loadSchools() {
        this.schools = JSON.parse(localStorage.getItem('schools')) || [];
        this.updateUI();
    }
    
    updateUI() {
        // Atualizar mapa se estiver visível
        if (document.getElementById('map').classList.contains('active')) {
            schoolMap.render();
        }
        
        // Atualizar relatórios se estiverem visíveis
        if (document.getElementById('reports').classList.contains('active')) {
            reportManager.updateReports();
        }
    }
    
    getSchools() {
        return this.schools;
    }
    
    getSchoolsByCapacity(capacity) {
        if (capacity === 'all') return this.schools;
        
        return this.schools.filter(school => {
            if (capacity === 'low') return school.students <= 100;
            if (capacity === 'medium') return school.students > 100 && school.students <= 500;
            if (capacity === 'high') return school.students > 500;
            return true;
        });
    }
}

class SchoolMap extends Component {
    constructor() {
        super('school-map');
        this.schoolManager = schoolManager;
        this.init();
    }
    
    init() {
        // Configurar filtro de capacidade
        const capacityFilter = document.getElementById('capacity-filter');
        if (capacityFilter) {
            capacityFilter.addEventListener('change', () => this.render());
        }
        
        // Configurar botão de redefinir
        const resetButton = document.getElementById('reset-map');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                capacityFilter.value = 'all';
                this.render();
            });
        }
        
        // Renderizar mapa inicial
        this.render();
    }
    
    render() {
        const capacityFilter = document.getElementById('capacity-filter');
        const capacity = capacityFilter ? capacityFilter.value : 'all';
        const schools = this.schoolManager.getSchoolsByCapacity(capacity);
        
        // Limpar mapa
        this.element.innerHTML = '';
        
        if (schools.length === 0) {
            this.element.innerHTML = '<div class="map-placeholder"><p>Nenhuma escola encontrada</p></div>';
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
        schools.forEach(school => {
            const marker = this.createMarker(school);
            mapContent.appendChild(marker);
        });
        
        this.element.appendChild(mapContent);
    }
    
    createMarker(school) {
        const marker = document.createElement('div');
        marker.className = 'school-marker';
        marker.style.position = 'absolute';
        
        // Posicionar aleatoriamente no mapa (em um sistema real usaríamos coordenadas reais)
        marker.style.left = `${30 + Math.random() * 60}%`;
        marker.style.top = `${30 + Math.random() * 60}%`;
        
        // Definir cor baseada na capacidade
        let color;
        if (school.students <= 100) color = '#e74c3c'; // Vermelho para baixa capacidade
        else if (school.students <= 500) color = '#f39c12'; // Laranja para média capacidade
        else color = '#2ecc71'; // Verde para alta capacidade
        
        marker.style.width = '20px';
        marker.style.height = '20px';
        marker.style.backgroundColor = color;
        marker.style.borderRadius = '50%';
        marker.style.border = '2px solid white';
        marker.style.cursor = 'pointer';
        marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        
        // Tooltip com informações da escola
        marker.title = `${school.name}\nAlunos: ${school.students}\nProfessores: ${school.teachers}`;
        
        // Adicionar evento de clique
        marker.addEventListener('click', () => {
            alert(`Escola: ${school.name}\nEndereço: ${school.address}\nAlunos: ${school.students}\nProfessores: ${school.teachers}\nInfraestrutura: ${school.infrastructure.join(', ') || 'Nenhuma'}`);
        });
        
        return marker;
    }
}

class ReportManager extends Component {
    constructor() {
        super('reports');
        this.schoolManager = schoolManager;
        this.charts = {};
        this.init();
    }
    
    init() {
        // Configurar botão de gerar relatório
        const generateButton = document.getElementById('generate-report');
        if (generateButton) {
            generateButton.addEventListener('click', () => this.updateReports());
        }
        
        // Inicializar gráficos
        this.initCharts();
        
        // Atualizar relatórios iniciais
        this.updateReports();
    }
    
    initCharts() {
        // Configurar gráfico de alunos por escola
        const studentsCtx = document.getElementById('students-chart').getContext('2d');
        this.charts.students = new Chart(studentsCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Número de Alunos',
                    data: [],
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Alunos por Escola'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        // Configurar gráfico de professores por escola
        const teachersCtx = document.getElementById('teachers-chart').getContext('2d');
        this.charts.teachers = new Chart(teachersCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Número de Professores',
                    data: [],
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Professores por Escola'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        // Configurar gráfico de capacidade
        const capacityCtx = document.getElementById('capacity-chart').getContext('2d');
        this.charts.capacity = new Chart(capacityCtx, {
            type: 'doughnut',
            data: {
                labels: ['Baixa Capacidade', 'Média Capacidade', 'Alta Capacidade'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        '#e74c3c',
                        '#f39c12',
                        '#2ecc71'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribuição por Capacidade'
                    }
                }
            }
        });
    }
    
    updateReports() {
        const schools = this.schoolManager.getSchools();
        
        // Atualizar gráfico de alunos
        this.charts.students.data.labels = schools.map(school => school.name);
        this.charts.students.data.datasets[0].data = schools.map(school => school.students);
        this.charts.students.update();
        
        // Atualizar gráfico de professores
        this.charts.teachers.data.labels = schools.map(school => school.name);
        this.charts.teachers.data.datasets[0].data = schools.map(school => school.teachers);
        this.charts.teachers.update();
        
        // Calcular distribuição por capacidade
        const lowCapacity = schools.filter(school => school.students <= 100).length;
        const mediumCapacity = schools.filter(school => school.students > 100 && school.students <= 500).length;
        const highCapacity = schools.filter(school => school.students > 500).length;
        
        // Atualizar gráfico de capacidade
        this.charts.capacity.data.datasets[0].data = [lowCapacity, mediumCapacity, highCapacity];
        this.charts.capacity.update();
        
        // Atualizar resumo estatístico
        this.updateStatistics(schools);
    }
    
    updateStatistics(schools) {
        const totalSchools = schools.length;
        const totalStudents = schools.reduce((sum, school) => sum + school.students, 0);
        const totalTeachers = schools.reduce((sum, school) => sum + school.teachers, 0);
        const avgRatio = totalTeachers > 0 ? (totalStudents / totalTeachers).toFixed(2) : 0;
        
        document.getElementById('total-schools').textContent = totalSchools;
        document.getElementById('total-students').textContent = totalStudents;
        document.getElementById('total-teachers').textContent = totalTeachers;
        document.getElementById('avg-ratio').textContent = avgRatio;
    }
}

// Navegação entre páginas
function navigateTo(pageId) {
    // Ocultar todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar a página selecionada
    document.getElementById(pageId).classList.add('active');
    
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Atualizar componentes específicos da página
    if (pageId === 'map') {
        schoolMap.render();
    } else if (pageId === 'reports') {
        reportManager.updateReports();
    }
}

// Configurar navegação
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('href').substring(1);
        navigateTo(pageId);
    });
});

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gerenciador de escolas
    window.schoolManager = new SchoolManager();
    
    // Inicializar mapa
    window.schoolMap = new SchoolMap();
    
    // Inicializar gerenciador de relatórios
    window.reportManager = new ReportManager();
    
    // Navegar para a página inicial por padrão
    navigateTo('home');
});