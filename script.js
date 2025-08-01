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
        // 趋势图表
        const trendCtx = document.getElementById('trendChart');
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
                            },
                            ticks: {
                                font: {
                                    family: 'Microsoft YaHei'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                font: {
                                    family: 'Microsoft YaHei'
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }

        // 病毒型别分布图
        const virusCtx = document.getElementById('virusChart');
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
        }

        // 地区分布图
        const regionCtx = document.getElementById('regionChart');
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
                                    family: 'Microsoft YaHei'
                                }
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                },
                                font: {
                                    family: 'Microsoft YaHei'
                                }
                            }
                        }
                    }
                }
            });
        }
        
        console.log('图表初始化完成');
    } catch (error) {
        console.error('图表初始化失败:', error);
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
}

// 显示周报详情
function showWeekDetail(week) {
    alert('查看' + week + '详细数据\n\n' +
          '这里将显示该周的详细流感监测数据，\n' +
          '包括各省份分布、年龄组分析、\n' +
          '病毒型别检测结果等信息。');
    
    console.log('显示周报详情:', week);
}

// 下载报告
function downloadReport(week) {
    // 模拟下载
    const fileName = week.replace(/年|周/g, '') + '期中国流感监测周报.pdf';
    alert('开始下载: ' + fileName + '\n\n' +
          '实际部署时，这里会直接下载对应的PDF文件。');
    
    console.log('下载报告:', week);
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