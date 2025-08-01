// 全局变量
let trendChart, virusChart, regionChart;
let influenzaData = {
    weeks: ['第28周', '第29周', '第30周'],
    positiveRates: [12.8, 13.1, 15.2],
    visitRates: [4.1, 4.3, 3.8],
    outbreaks: [18, 15, 12],
    samples: [2691, 2734, 2847]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeNavigation();
    initializeSearch();
    initializeAnimations();
    initializeDataTable();
    
    console.log('流感监测平台初始化完成');
});

// 初始化图表
function initializeCharts() {
    try {
        console.log('开始初始化图表...');
        
        // 趋势图表
        const trendCtx = document.getElementById('trendChart');
        console.log('趋势图表元素:', trendCtx);
        if (trendCtx) {
            trendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: influenzaData.weeks,
                    datasets: [
                        {
                            label: '阳性率 (%)',
                            data: influenzaData.positiveRates,
                            borderColor: '#2E86AB',
                            backgroundColor: 'rgba(46, 134, 171, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#2E86AB',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        },
                        {
                            label: '就诊比例 (%)',
                            data: influenzaData.visitRates,
                            borderColor: '#28a745',
                            backgroundColor: 'rgba(40, 167, 69, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4,
                            pointBackgroundColor: '#28a745',
                            pointBorderColor: '#fff',
                            pointBorderWidth: 2,
                            pointRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false
                        },
                        legend: {
                            position: 'top',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: 12,
                                    family: 'Microsoft YaHei'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#2E86AB',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                title: function(context) {
                                    return '2025年' + context[0].label;
                                },
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 12
                                },
                                color: '#666',
                                maxRotation: 0
                            },
                            title: {
                                display: true,
                                text: '监测周次',
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#333',
                                padding: 10
                            }
                        },
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 20,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(1) + '%';
                                },
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 12
                                },
                                color: '#666',
                                stepSize: 2
                            },
                            title: {
                                display: true,
                                text: '百分比 (%)',
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#333',
                                padding: 10
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
            console.log('趋势图表创建成功');
        } else {
            console.error('未找到趋势图表canvas元素');
        }

        // 病毒型别分布图
        const virusCtx = document.getElementById('virusChart');
        console.log('病毒图表元素:', virusCtx);
        if (virusCtx) {
            virusChart = new Chart(virusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['A(H3N2)', 'A(H1N1)pdm09', 'B型Victoria', 'B型Yamagata', '其他'],
                    datasets: [{
                        data: [45.2, 28.7, 15.3, 8.1, 2.7],
                        backgroundColor: [
                            '#2E86AB',
                            '#A23B72', 
                            '#28a745',
                            '#ffc107',
                            '#6c757d'
                        ],
                        borderWidth: 0,
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                font: {
                                    size: 11,
                                    family: 'Microsoft YaHei'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#2E86AB',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
            console.log('病毒型别分布图创建成功');
        } else {
            console.error('未找到病毒图表canvas元素');
        }

        // 地区分布图
        const regionCtx = document.getElementById('regionChart');
        console.log('地区图表元素:', regionCtx);
        if (regionCtx) {
            const regions = ['北京', '上海', '广东', '浙江', '江苏', '山东', '四川', '河南', '湖北', '湖南'];
            const regionData = [18.5, 16.2, 14.8, 13.9, 15.1, 12.3, 11.7, 13.2, 14.5, 12.8];
            
            regionChart = new Chart(regionCtx, {
                type: 'bar',
                data: {
                    labels: regions,
                    datasets: [{
                        label: '流感活动水平 (%)',
                        data: regionData,
                        backgroundColor: regionData.map(value => {
                            if (value >= 15) return '#dc3545'; // 高
                            if (value >= 12) return '#ffc107'; // 中
                            return '#28a745'; // 低
                        }),
                        borderRadius: 6,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: '#2E86AB',
                            borderWidth: 1,
                            cornerRadius: 8,
                            callbacks: {
                                title: function(context) {
                                    return context[0].label + '省/市';
                                },
                                label: function(context) {
                                    let level = '低';
                                    if (context.parsed.y >= 15) level = '高';
                                    else if (context.parsed.y >= 12) level = '中';
                                    return '活动水平: ' + context.parsed.y + '% (' + level + ')';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 11
                                },
                                color: '#666',
                                maxRotation: 45,
                                minRotation: 0
                            },
                            title: {
                                display: true,
                                text: '省份/直辖市',
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#333',
                                padding: 10
                            }
                        },
                        y: {
                            beginAtZero: true,
                            min: 0,
                            max: 25,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                callback: function(value) {
                                    return value.toFixed(1) + '%';
                                },
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 12
                                },
                                color: '#666',
                                stepSize: 2
                            },
                            title: {
                                display: true,
                                text: '流感活动水平 (%)',
                                font: {
                                    family: 'Microsoft YaHei',
                                    size: 14,
                                    weight: 'bold'
                                },
                                color: '#333',
                                padding: 10
                            }
                        }
                    }
                }
            });
            console.log('地区分布图创建成功');
        } else {
            console.error('未找到地区图表canvas元素');
        }
        
        console.log('所有图表初始化完成');
    } catch (error) {
        console.error('图表初始化失败:', error);
        console.error('错误详情:', error.stack);
    }
}

// 初始化导航功能
function initializeNavigation() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 导航栏激活状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// 初始化搜索功能
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const weekFilter = document.getElementById('weekFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterHistoryData();
        });
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', function() {
            filterHistoryData();
        });
    }
    
    if (weekFilter) {
        weekFilter.addEventListener('change', function() {
            filterHistoryData();
        });
    }
}

// 筛选历史数据
function filterHistoryData() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const selectedYear = document.getElementById('yearFilter')?.value || '';
    const selectedWeek = document.getElementById('weekFilter')?.value || '';
    
    const rows = document.querySelectorAll('#historyTableBody tr');
    
    rows.forEach(row => {
        const weekText = row.cells[0].textContent.toLowerCase();
        const yearMatch = selectedYear === '' || weekText.includes(selectedYear);
        const weekMatch = selectedWeek === '' || weekText.includes('第' + selectedWeek + '周');
        const searchMatch = searchTerm === '' || weekText.includes(searchTerm);
        
        if (yearMatch && weekMatch && searchMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    console.log('数据筛选完成');
}

// 初始化动画
function initializeAnimations() {
    // 滚动时触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    // 监控需要动画的元素
    document.querySelectorAll('.metric-card, .chart-container, .about-card').forEach(card => {
        observer.observe(card);
    });
}

// 初始化数据表格
function initializeDataTable() {
    // 为表格行添加点击事件
    document.querySelectorAll('#historyTableBody tr').forEach(row => {
        row.addEventListener('click', function() {
            const week = this.cells[0].textContent;
            showWeekDetail(week);
        });
    });

    // 为按钮添加事件监听
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('查看')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const week = this.closest('tr').cells[0].textContent;
                showWeekDetail(week);
            });
        }
    });

    document.querySelectorAll('.btn-success').forEach(btn => {
        if (btn.textContent.includes('下载')) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const week = this.closest('tr').cells[0].textContent;
                downloadReport(week);
            });
        }
    });

    // 初始化综合数据表格排序功能
    initializeTableSorting();
    
    // 初始化数据筛选功能
    initializeDataFiltering();
    
    console.log('数据表格功能初始化完成');
}

// 初始化表格排序功能
function initializeTableSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    
    sortableHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            const table = document.getElementById('comprehensiveDataTable');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // 获取当前排序状态
            const currentSort = this.getAttribute('data-sort') || 'asc';
            const newSort = currentSort === 'asc' ? 'desc' : 'asc';
            
            // 清除所有排序图标
            sortableHeaders.forEach(h => {
                h.querySelector('.fas').className = 'fas fa-sort ms-1';
                h.removeAttribute('data-sort');
            });
            
            // 设置当前排序图标
            this.setAttribute('data-sort', newSort);
            const icon = this.querySelector('.fas');
            icon.className = newSort === 'asc' ? 'fas fa-sort-up ms-1' : 'fas fa-sort-down ms-1';
            
            // 排序数据
            rows.sort((a, b) => {
                let aVal, bVal;
                
                switch(column) {
                    case 'positiveRate':
                        aVal = parseFloat(a.cells[1].textContent.match(/\d+\.\d+/)[0]);
                        bVal = parseFloat(b.cells[1].textContent.match(/\d+\.\d+/)[0]);
                        break;
                    case 'visitRate':
                        aVal = parseFloat(a.cells[2].textContent);
                        bVal = parseFloat(b.cells[2].textContent);
                        break;
                    case 'outbreaks':
                        aVal = parseInt(a.cells[3].textContent.match(/\d+/)[0]);
                        bVal = parseInt(b.cells[3].textContent.match(/\d+/)[0]);
                        break;
                    case 'samples':
                        aVal = parseInt(a.cells[4].textContent.replace(/,/g, ''));
                        bVal = parseInt(b.cells[4].textContent.replace(/,/g, ''));
                        break;
                    default:
                        return 0;
                }
                
                if (newSort === 'asc') {
                    return aVal - bVal;
                } else {
                    return bVal - aVal;
                }
            });
            
            // 重新排列行
            rows.forEach(row => tbody.appendChild(row));
            
            // 添加排序动画
            tbody.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                tbody.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
        });
    });
}

// 初始化数据筛选功能
function initializeDataFiltering() {
    const dataTypeFilter = document.getElementById('dataTypeFilter');
    
    if (dataTypeFilter) {
        dataTypeFilter.addEventListener('change', function() {
            const filterType = this.value;
            const table = document.getElementById('comprehensiveDataTable');
            const headers = table.querySelectorAll('thead th');
            const rows = table.querySelectorAll('tbody tr');
            
            // 重置所有列显示
            headers.forEach((header, index) => {
                header.style.display = '';
            });
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => {
                    cell.style.display = '';
                });
            });
            
            // 根据筛选类型隐藏列
            if (filterType !== 'all') {
                const hideColumns = [];
                
                switch(filterType) {
                    case 'positive':
                        hideColumns = [2, 3, 4]; // 隐藏就诊比例、暴发疫情、检测样本
                        break;
                    case 'visit':
                        hideColumns = [1, 3, 4]; // 隐藏阳性率、暴发疫情、检测样本
                        break;
                    case 'outbreak':
                        hideColumns = [1, 2, 4]; // 隐藏阳性率、就诊比例、检测样本
                        break;
                }
                
                hideColumns.forEach(colIndex => {
                    headers[colIndex].style.display = 'none';
                    rows.forEach(row => {
                        row.cells[colIndex].style.display = 'none';
                    });
                });
            }
        });
    }
}

// 导出表格数据
function exportTableData(format) {
    const table = document.getElementById('comprehensiveDataTable');
    const data = [];
    
    // 获取表头
    const headers = Array.from(table.querySelectorAll('thead th'))
        .filter(th => th.style.display !== 'none')
        .map(th => th.textContent.trim().replace(/\n/g, ' ').replace(/\s+/g, ' '));
    
    data.push(headers);
    
    // 获取数据行
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const rowData = Array.from(row.querySelectorAll('td'))
            .filter((td, index) => {
                const header = table.querySelectorAll('thead th')[index];
                return header.style.display !== 'none';
            })
            .map(td => {
                // 清理HTML标签，只保留文本
                const text = td.textContent.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
                return text;
            });
        data.push(rowData);
    });
    
    if (format === 'csv') {
        downloadCSV(data, '流感监测数据.csv');
    } else if (format === 'excel') {
        downloadExcel(data, '流感监测数据.xlsx');
    }
}

// 下载CSV文件
function downloadCSV(data, filename) {
    const csvContent = data.map(row => 
        row.map(cell => {
            // 如果包含逗号或引号，需要用引号包围
            if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
                return '"' + cell.replace(/"/g, '""') + '"';
            }
            return cell;
        }).join(',')
    ).join('\n');
    
    // 添加UTF-8 BOM以支持中文
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// 下载Excel文件 (简化版本，实际需要更复杂的库)
function downloadExcel(data, filename) {
    // 这里提供一个简化的HTML表格导出为Excel的方法
    let htmlTable = '<table border="1">';
    
    data.forEach((row, index) => {
        const tag = index === 0 ? 'th' : 'td';
        htmlTable += '<tr>';
        row.forEach(cell => {
            htmlTable += `<${tag}>${cell}</${tag}>`;
        });
        htmlTable += '</tr>';
    });
    
    htmlTable += '</table>';
    
    const blob = new Blob(['\ufeff' + htmlTable], {
        type: 'application/vnd.ms-excel'
    });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// 打印表格
function printTable() {
    const table = document.getElementById('comprehensiveDataTable');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>流感监测数据打印</title>
            <meta charset="UTF-8">
            <style>
                body { font-family: 'Microsoft YaHei', sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; font-weight: bold; }
                .title { text-align: center; margin-bottom: 20px; }
                .print-info { font-size: 12px; color: #666; margin-top: 20px; }
                @media print {
                    body { margin: 0; }
                    .print-info { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="title">
                <h2>中国流感监测数据平台 - 监测数据报告</h2>
                <p>数据来源：中国疾病预防控制中心</p>
            </div>
            ${table.outerHTML}
            <div class="print-info">
                <p>打印时间：${new Date().toLocaleString('zh-CN')}</p>
                <p>网站地址：https://gausshuang.github.io/influenza</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // 等待内容加载完成后打印
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// 显示周报详情
function showWeekDetail(week) {
    console.log('显示周报详情:', week);
    
    // 创建模态框显示详细信息
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-chart-bar me-2"></i>
                        ${week} 流感监测详情
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h6><i class="fas fa-percentage me-2"></i>关键指标</h6>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>流感阳性率</span>
                                    <strong class="text-primary">${week.includes('第30周') ? '15.2%' : week.includes('第29周') ? '13.1%' : '12.8%'}</strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>就诊比例</span>
                                    <strong class="text-success">${week.includes('第30周') ? '3.8%' : week.includes('第29周') ? '4.3%' : '4.1%'}</strong>
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>暴发疫情</span>
                                    <strong class="text-warning">${week.includes('第30周') ? '12起' : week.includes('第29周') ? '15起' : '18起'}</strong>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6><i class="fas fa-virus me-2"></i>主要病毒型别</h6>
                            <div class="progress mb-2">
                                <div class="progress-bar bg-primary" style="width: 45%">A(H3N2) 45%</div>
                            </div>
                            <div class="progress mb-2">
                                <div class="progress-bar bg-secondary" style="width: 29%">A(H1N1) 29%</div>
                            </div>
                            <div class="progress mb-2">
                                <div class="progress-bar bg-success" style="width: 15%">B型Victoria 15%</div>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-warning" style="width: 8%">B型Yamagata 8%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="downloadReport('${week}')">
                        <i class="fas fa-download me-2"></i>下载PDF报告
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // 模态框关闭后删除元素
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

// 下载报告
function downloadReport(week) {
    console.log('下载报告:', week);
    
    // 确定PDF文件名
    let fileName = '';
    if (week.includes('第30周')) {
        fileName = '2025年第30周第867期中国流感监测周报.pdf';
    } else if (week.includes('第29周')) {
        fileName = '2025年第29周第866期中国流感监测周报.pdf';
    } else if (week.includes('第28周')) {
        fileName = '2025年第28周第865期中国流感监测周报.pdf';
    } else {
        fileName = week.replace(/年|周/g, '') + '期中国流感监测周报.pdf';
    }
    
    // 检查文件是否存在（模拟）
    const fileExists = ['2025年第30周第867期中国流感监测周报.pdf', 
                       '2025年第29周第866期中国流感监测周报.pdf', 
                       '2025年第28周第865期中国流感监测周报.pdf'].includes(fileName);
    
    if (fileExists) {
        // 创建下载链接
        const link = document.createElement('a');
        link.href = fileName;
        link.download = fileName;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示成功提示
        showToast('下载开始', `正在下载 ${fileName}`, 'success');
    } else {
        showToast('文件不存在', `未找到文件 ${fileName}`, 'warning');
    }
}

// 显示提示信息
function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <strong>${title}</strong><br>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();
    
    // 自动删除
    toast.addEventListener('hidden.bs.toast', () => {
        toastContainer.removeChild(toast);
    });
}

// 创建Toast容器
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
    return container;
}

// 更新数据函数
function updateInfluenzaData(newData) {
    influenzaData = { ...influenzaData, ...newData };
    
    // 更新图表
    if (trendChart) {
        trendChart.data.labels = influenzaData.weeks;
        trendChart.data.datasets[0].data = influenzaData.positiveRates;
        trendChart.data.datasets[1].data = influenzaData.visitRates;
        trendChart.update();
    }
    
    // 更新关键指标
    updateMetricCards();
    
    console.log('数据更新完成:', newData);
}

// 更新关键指标卡片
function updateMetricCards() {
    const latest = influenzaData.positiveRates.length - 1;
    const previous = latest - 1;
    
    if (latest >= 0) {
        // 更新阳性率
        const positiveRate = influenzaData.positiveRates[latest];
        const rateChange = previous >= 0 ? 
            (positiveRate - influenzaData.positiveRates[previous]) : 0;
        
        updateMetricCard('.metric-value', positiveRate + '%', rateChange);
        
        // 更新其他指标...
    }
}

// 更新单个指标卡片
function updateMetricCard(selector, value, change) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
        
        const changeElement = element.parentElement.querySelector('.metric-change');
        if (changeElement) {
            const icon = change > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
            const className = change > 0 ? 'positive' : 'negative';
            const sign = change > 0 ? '+' : '';
            
            changeElement.innerHTML = `<i class="fas ${icon}"></i> ${sign}${change.toFixed(1)}%`;
            changeElement.className = `metric-change ${className}`;
        }
    }
}

// 添加新周报数据
function addNewWeekReport(weekData) {
    // 添加到数据数组
    influenzaData.weeks.push(weekData.week);
    influenzaData.positiveRates.push(weekData.positiveRate);
    influenzaData.visitRates.push(weekData.visitRate);
    influenzaData.outbreaks.push(weekData.outbreaks);
    influenzaData.samples.push(weekData.samples);
    
    // 保持最近10周的数据
    if (influenzaData.weeks.length > 10) {
        influenzaData.weeks.shift();
        influenzaData.positiveRates.shift();
        influenzaData.visitRates.shift();
        influenzaData.outbreaks.shift();
        influenzaData.samples.shift();
    }
    
    // 更新图表和表格
    updateInfluenzaData(influenzaData);
    addToHistoryTable(weekData);
    
    console.log('新增周报数据:', weekData);
}

// 添加到历史数据表格
function addToHistoryTable(weekData) {
    const tbody = document.getElementById('historyTableBody');
    if (tbody) {
        const newRow = tbody.insertRow(0); // 插入到第一行
        
        newRow.innerHTML = `
            <td>${weekData.week}</td>
            <td><span class="badge bg-${getStatusColor(weekData.positiveRate)}">${weekData.positiveRate}%</span></td>
            <td>${weekData.visitRate}%</td>
            <td>${weekData.outbreaks}起</td>
            <td>
                <button class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-eye"></i> 查看
                </button>
                <button class="btn btn-sm btn-success">
                    <i class="fas fa-download"></i> 下载
                </button>
            </td>
        `;
        
        // 为新行添加事件监听
        initializeTableRowEvents(newRow);
    }
}

// 获取状态颜色
function getStatusColor(rate) {
    if (rate >= 15) return 'warning';
    if (rate >= 10) return 'success';
    return 'secondary';
}

// 为表格行初始化事件
function initializeTableRowEvents(row) {
    row.addEventListener('click', function() {
        const week = this.cells[0].textContent;
        showWeekDetail(week);
    });

    row.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.stopPropagation();
        const week = this.closest('tr').cells[0].textContent;
        showWeekDetail(week);
    });

    row.querySelector('.btn-success').addEventListener('click', function(e) {
        e.stopPropagation();
        const week = this.closest('tr').cells[0].textContent;
        downloadReport(week);
    });
}

// 工具函数：格式化数字
function formatNumber(num, decimals = 1) {
    return Number(num).toFixed(decimals);
}

// 工具函数：获取颜色值
function getColor(type) {
    const colors = {
        primary: '#2E86AB',
        secondary: '#A23B72',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#17a2b8'
    };
    return colors[type] || colors.primary;
}

// 响应式图表调整
function resizeCharts() {
    if (trendChart) trendChart.resize();
    if (virusChart) virusChart.resize();
    if (regionChart) regionChart.resize();
}

// 窗口大小改变时调整图表
window.addEventListener('resize', function() {
    resizeCharts();
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 导出函数到全局作用域
window.influenzaApp = {
    updateInfluenzaData,
    addNewWeekReport,
    showWeekDetail,
    downloadReport,
    resizeCharts
};

console.log('流感监测平台脚本加载完成');
console.log('流感监测平台脚本加载完成');
console.log('流感监测平台脚本加载完成');