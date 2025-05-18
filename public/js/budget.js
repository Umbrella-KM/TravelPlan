// Budget handling functions for TravelPlan

const budgetManager = (() => {
    // Private variables and methods
    let budgetData = null;
    let budgetChart = null;
    
    // Initialize the budget chart
    const initBudgetChart = (data) => {
        const ctx = document.getElementById('budget-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (budgetChart) {
            budgetChart.destroy();
        }
        
        // Create new chart
        budgetChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Accommodation',
                    'Food',
                    'Attractions',
                    'Transportation',
                    'Miscellaneous'
                ],
                datasets: [{
                    data: [
                        data.breakdown.accommodation,
                        data.breakdown.food,
                        data.breakdown.attractions,
                        data.breakdown.transportation,
                        data.breakdown.miscellaneous
                    ],
                    backgroundColor: [
                        '#4e73df',
                        '#1cc88a',
                        '#36b9cc',
                        '#f6c23e',
                        '#e74a3b'
                    ],
                    hoverBackgroundColor: [
                        '#2e59d9',
                        '#17a673',
                        '#2c9faf',
                        '#dda20a',
                        '#be2617'
                    ],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }]
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const datasetLabel = data.labels[tooltipItem.index];
                            const value = data.datasets[0].data[tooltipItem.index];
                            return datasetLabel + ': $' + value.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                cutoutPercentage: 70
            }
        });
    };
    
    // Render budget details
    const renderBudgetDetails = (data) => {
        const budgetDetailsElement = document.getElementById('budget-details');
        
        // Clear existing content
        budgetDetailsElement.innerHTML = '';
        
        // Create budget summary
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'budget-summary mb-4';
        summaryDiv.innerHTML = `
            <h4 class="mb-3">Budget Summary</h4>
            <div class="budget-item">
                <span class="budget-category">Total Budget:</span>
                <span class="budget-amount">$${data.totalBudget.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Daily Budget:</span>
                <span class="budget-amount">$${data.dailyBudget.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Travel Style:</span>
                <span class="budget-amount text-capitalize">${data.travelStyle}</span>
            </div>
        `;
        
        // Create budget breakdown
        const breakdownDiv = document.createElement('div');
        breakdownDiv.className = 'budget-breakdown mt-4';
        breakdownDiv.innerHTML = `
            <h4 class="mb-3">Budget Breakdown</h4>
            <div class="budget-item">
                <span class="budget-category">Accommodation:</span>
                <span class="budget-amount">$${data.breakdown.accommodation.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Food:</span>
                <span class="budget-amount">$${data.breakdown.food.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Attractions:</span>
                <span class="budget-amount">$${data.breakdown.attractions.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Transportation:</span>
                <span class="budget-amount">$${data.breakdown.transportation.toLocaleString()}</span>
            </div>
            <div class="budget-item">
                <span class="budget-category">Miscellaneous:</span>
                <span class="budget-amount">$${data.breakdown.miscellaneous.toLocaleString()}</span>
            </div>
        `;
        
        // Append to budget details
        budgetDetailsElement.appendChild(summaryDiv);
        budgetDetailsElement.appendChild(breakdownDiv);
    };
    
    // Public methods
    return {
        // Calculate budget based on input parameters
        calculateBudget: async (totalBudget, days, travelStyle) => {
            try {
                // In a real application, this would call an API to get accurate budget information
                // For now, we'll use our mock data generator
                budgetData = await api.simulateApiCall('budget', null, days, totalBudget, travelStyle);
                
                // Initialize budget chart
                initBudgetChart(budgetData);
                
                // Render budget details
                renderBudgetDetails(budgetData);
                
                return budgetData;
            } catch (error) {
                console.error('Error calculating budget:', error);
                throw error;
            }
        },
        
        // Get current budget data
        getBudgetData: () => {
            return budgetData;
        },
        
        // Format currency
        formatCurrency: (amount) => {
            return '$' + amount.toLocaleString();
        }
    };
})();

