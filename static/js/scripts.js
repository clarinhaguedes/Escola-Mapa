// js/scripts.js - Código para a página de relatórios

// Verifica se estamos na página de relatórios
if (document.getElementById('students-chart')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeReports();
    });
}

function initializeReports() {
    // Inicializar gráficos
    initCharts();
    
    // Atualizar relatórios com dados iniciais
    updateReports();
    
    // Configurar evento do botão
    const generateButton = document.getElementById('generate-report');
    if (generateButton) {
        generateButton.addEventListener('click', updateReports);
    }
    
    // Configurar evento do seletor
    const reportType = document.getElementById('report-type');
    if (reportType) {
        reportType.addEventListener('change', toggleCharts);
    }
}

function initCharts() {
    // Dados de exemplo para demonstração
    const sampleSchools = [
        { name: "Escola A", students: 350, teachers: 25 },
        { name: "Escola B", students: 800, teachers: 45 },
        { name: "Escola C", students: 80, teachers: 8 }
    ];
    
    // Gráfico de alunos
    const studentsCtx = document.getElementById('students-chart').getContext('2d');
    window.studentsChart = new Chart(studentsCtx, {
        type: 'bar',
        data: {
            labels: sampleSchools.map(school => school.name),
            datasets: [{
                label: 'Número de Alunos',
                data: sampleSchools.map(school => school.students),
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
    
    // Gráfico de professores
    const teachersCtx = document.getElementById('teachers-chart').getContext('2d');
    window.teachersChart = new Chart(teachersCtx, {
        type: 'bar',
        data: {
            labels: sampleSchools.map(school => school.name),
            datasets: [{
                label: 'Número de Professores',
                data: sampleSchools.map(school => school.teachers),
                backgroundColor: '#2ecc71',
                borderColor: '#27ae60',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
    
    // Gráfico de capacidade
    const capacityCtx = document.getElementById('capacity-chart').getContext('2d');
    window.capacityChart = new Chart(capacityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Baixa Capacidade', 'Média Capacidade', 'Alta Capacidade'],
            datasets: [{
                data: [1, 1, 1], // Dados iniciais
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
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição por Capacidade'
                }
            }
        }
    });
}

function updateReports() {
    // Em um sistema real, aqui você buscaria os dados do servidor
    // Por enquanto, usamos dados de exemplo
    
    const sampleData = {
        totalSchools: 3,
        totalStudents: 1230,
        totalTeachers: 78,
        avgRatio: 15.8
    };
    
    // Atualizar estatísticas
    document.getElementById('total-schools').textContent = sampleData.totalSchools;
    document.getElementById('total-students').textContent = sampleData.totalStudents;
    document.getElementById('total-teachers').textContent = sampleData.totalTeachers;
    document.getElementById('avg-ratio').textContent = sampleData.avgRatio;
    
    console.log('Relatórios atualizados com dados de exemplo');
}

function toggleCharts() {
    const reportType = document.getElementById('report-type').value;
    const charts = document.querySelectorAll('.chart-wrapper');
    
    // Mostrar/ocultar gráficos baseado na seleção
    charts.forEach(chart => chart.style.display = 'none');
    
    if (reportType === 'students') {
        document.getElementById('students-chart').closest('.chart-wrapper').style.display = 'flex';
    } else if (reportType === 'teachers') {
        document.getElementById('teachers-chart').closest('.chart-wrapper').style.display = 'flex';
    } else if (reportType === 'capacity') {
        document.getElementById('capacity-chart').closest('.chart-wrapper').style.display = 'flex';
    }
}