"// ========================================
// SECUREBANK - COMPLETE WORKING JAVASCRIPT
// ========================================

console.log('SecureBank Script Loaded Successfully!');

// ==================== Data Management ====================

const initializeDefaultData = () => {
    if (!localStorage.getItem('bankData')) {
        const defaultData = {
            user: {
                name: 'John Doe',
                username: 'demo',
                email: 'john.doe@securebank.com',
                phone: '+1 (555) 123-4567',
                address: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                memberSince: 'Jan 2024'
            },
            accounts: {
                checking: {
                    name: 'Checking Account',
                    number: '1234 5678 9012 4532',
                    balance: 12458.50,
                    icon: '💳',
                    routing: '021000021'
                },
                savings: {
                    name: 'Savings Account',
                    number: '1234 5678 9012 8721',
                    balance: 45280.75,
                    icon: '💰',
                    interestRate: '2.5% APY'
                },
                credit: {
                    name: 'Credit Card',
                    number: '1234 5678 9012 3298',
                    balance: 2340.00,
                    icon: '💎',
                    limit: 10000
                }
            },
            loans: [
                {
                    id: 'loan1',
                    name: 'Home Loan',
                    icon: '🏠',
                    originalAmount: 250000.00,
                    balance: 185500.00,
                    interestRate: '3.25% APR',
                    monthlyPayment: 1850.00,
                    nextPaymentDate: '2024-12-01',
                    status: 'active'
                },
                {
                    id: 'loan2',
                    name: 'Auto Loan',
                    icon: '🚗',
                    originalAmount: 35000.00,
                    balance: 22450.00,
                    interestRate: '4.75% APR',
                    monthlyPayment: 650.00,
                    nextPaymentDate: '2024-12-01',
                    status: 'active'
                }
            ],
            transactions: [
                { id: 1, name: 'Amazon Purchase', date: '2024-11-20', amount: -85.50, type: 'debit', category: 'Shopping', account: 'checking' },
                { id: 2, name: 'Salary Deposit', date: '2024-11-18', amount: 5250.00, type: 'credit', category: 'Income', account: 'checking' },
                { id: 3, name: 'Netflix Subscription', date: '2024-11-17', amount: -15.99, type: 'debit', category: 'Entertainment', account: 'credit' },
                { id: 4, name: 'Grocery Store', date: '2024-11-16', amount: -142.30, type: 'debit', category: 'Food', account: 'checking' },
                { id: 5, name: 'Freelance Payment', date: '2024-11-15', amount: 850.00, type: 'credit', category: 'Income', account: 'checking' },
                { id: 6, name: 'Gas Station', date: '2024-11-14', amount: -52.75, type: 'debit', category: 'Transportation', account: 'checking' },
                { id: 7, name: 'Restaurant', date: '2024-11-13', amount: -68.90, type: 'debit', category: 'Food', account: 'credit' },
                { id: 8, name: 'ATM Withdrawal', date: '2024-11-12', amount: -200.00, type: 'debit', category: 'Cash', account: 'checking' }
            ],
            billPayments: []
        };
        localStorage.setItem('bankData', JSON.stringify(defaultData));
        console.log('Default bank data initialized');
    }
};

const getBankData = () => {
    return JSON.parse(localStorage.getItem('bankData'));
};

const saveBankData = (data) => {
    localStorage.setItem('bankData', JSON.stringify(data));
    console.log('Bank data saved');
};

// ==================== LOGIN PAGE ====================
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting and page reloading
    
    // Get values from input fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return false;
    }

    // Demo credentials validation
    if (username === 'demo' && password === 'demo123') {
        alert('Login successful!');
        // Redirect to a new page (for example, a dashboard)
        window.location.href = 'dashboard.html';  // Modify the URL as needed
    } else {
        alert('Invalid credentials. Please try again.');
    }

    return false; // Prevent the form from submitting
}


// ==================== DASHBOARD ====================

if (document.querySelector('.dashboard-body')) {
    console.log('Dashboard page detected');
    
    // Check if user is logged in
    if (!localStorage.getItem('userLoggedIn')) {
        console.log('User not logged in, redirecting...');
        window.location.href = 'index.html';
    } else {
        console.log('User is logged in');
    }
    
    initializeDefaultData();
    
    // Update user display
    const updateUserDisplay = () => {
        const data = getBankData();
        const userName = data.user.name;
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }
        
        const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.textContent = initials;
        }
        
        const profileAvatarLarge = document.getElementById('profileAvatarLarge');
        if (profileAvatarLarge) {
            profileAvatarLarge.textContent = initials;
        }
    };
    
    updateUserDisplay();
    
    // ==================== Mobile Menu ====================
    
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const openSidebarBtn = document.getElementById('openSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    
    const openMobileMenu = () => {
        if (sidebar) sidebar.classList.add('mobile-open');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeMobileMenu = () => {
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // ==================== Navigation ====================
    
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');
    
    const navigateToPage = (pageId) => {
        console.log('Navigating to:', pageId);
        
        navItems.forEach(nav => nav.classList.remove('active'));
        pages.forEach(page => page.classList.add('hidden'));
        
        const selectedNav = document.querySelector(`[data-page=\\"${pageId}\\"]`);
        if (selectedNav) {
            selectedNav.classList.add('active');
        }
        
        const selectedPage = document.getElementById(pageId + '-page');
        if (selectedPage) {
            selectedPage.classList.remove('hidden');
            
            const pageTitles = {
                'overview': 'Dashboard Overview',
                'accounts': 'My Accounts',
                'transactions': 'Transaction History',
                'transfer': 'Transfer Money',
                'loans': 'My Loans',
                'bills': 'Pay Bills',
                'profile': 'My Profile'
            };
            
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.textContent = pageTitles[pageId];
            }
            
            // Close mobile menu
            closeMobileMenu();
            
            // Load page content
            if (pageId === 'overview') loadOverviewPage();
            else if (pageId === 'accounts') loadAccountsPage();
            else if (pageId === 'transactions') loadTransactionsTable();
            else if (pageId === 'transfer') loadTransferPage();
            else if (pageId === 'loans') loadLoansPage();
            else if (pageId === 'bills') loadBillsPage();
            else if (pageId === 'profile') loadProfilePage();
        }
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    // Quick actions and navigation links
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn')) {
            const action = e.target.closest('.action-btn').getAttribute('data-action');
            navigateToPage(action);
        }
        
        if (e.target.closest('[data-navigate]')) {
            e.preventDefault();
            const page = e.target.closest('[data-navigate]').getAttribute('data-navigate');
            navigateToPage(page);
        }
    });
    
    // ==================== Overview Page ====================
    
    const loadOverviewPage = () => {
        console.log('Loading overview page');
        const data = getBankData();
        
        const accountCardsGrid = document.getElementById('accountCardsGrid');
        if (accountCardsGrid) {
            accountCardsGrid.innerHTML = `
                <div class=\\"account-card checking-card\\">
                    <div class=\\"card-header\\">
                        <div>
                            <p class=\\"card-label\\">${data.accounts.checking.name}</p>
                            <p class=\\"account-number\\">**** **** ${data.accounts.checking.number.slice(-4)}</p>
                        </div>
                        <div class=\\"card-icon\\">${data.accounts.checking.icon}</div>
                    </div>
                    <div class=\\"card-balance\\">
                        <p class=\\"balance-amount\\">$${data.accounts.checking.balance.toFixed(2)}</p>
                        <p class=\\"balance-change positive\\">Available Balance</p>
                    </div>
                </div>
                
                <div class=\\"account-card savings-card\\">
                    <div class=\\"card-header\\">
                        <div>
                            <p class=\\"card-label\\">${data.accounts.savings.name}</p>
                            <p class=\\"account-number\\">**** **** ${data.accounts.savings.number.slice(-4)}</p>
                        </div>
                        <div class=\\"card-icon\\">${data.accounts.savings.icon}</div>
                    </div>
                    <div class=\\"card-balance\\">
                        <p class=\\"balance-amount\\">$${data.accounts.savings.balance.toFixed(2)}</p>
                        <p class=\\"balance-change positive\\">Interest: ${data.accounts.savings.interestRate}</p>
                    </div>
                </div>
                
                <div class=\\"account-card credit-card\\">
                    <div class=\\"card-header\\">
                        <div>
                            <p class=\\"card-label\\">${data.accounts.credit.name}</p>
                            <p class=\\"account-number\\">**** **** ${data.accounts.credit.number.slice(-4)}</p>
                        </div>
                        <div class=\\"card-icon\\">${data.accounts.credit.icon}</div>
                    </div>
                    <div class=\\"card-balance\\">
                        <p class=\\"balance-amount\\">$${data.accounts.credit.balance.toFixed(2)}</p>
                        <p class=\\"balance-change\\">Available: $${(data.accounts.credit.limit - data.accounts.credit.balance).toFixed(2)}</p>
                    </div>
                </div>
                
                <div class=\\"account-card loan-card\\">
                    <div class=\\"card-header\\">
                        <div>
                            <p class=\\"card-label\\">Total Loans</p>
                            <p class=\\"account-number\\">${data.loans.length} Active Loans</p>
                        </div>
                        <div class=\\"card-icon\\">🏦</div>
                    </div>
                    <div class=\\"card-balance\\">
                        <p class=\\"balance-amount\\">$${data.loans.reduce((sum, loan) => sum + loan.balance, 0).toFixed(2)}</p>
                        <p class=\\"balance-change\\">Total Outstanding</p>
                    </div>
                </div>
            `;
        }
        
        loadRecentTransactions();
    };
    
    const loadRecentTransactions = () => {
        const data = getBankData();
        const container = document.getElementById('recentTransactionsList');
        if (!container) return;
        
        const recentTransactions = data.transactions.slice(0, 5);
        
        if (recentTransactions.length === 0) {
            container.innerHTML = '<p style=\\"text-align: center; color: #718096; padding: 2rem;\\">No transactions yet</p>';
            return;
        }
        
        container.innerHTML = recentTransactions.map(transaction => `
            <div class=\\"transaction-item\\">
                <div class=\\"transaction-info\\">
                    <div class=\\"transaction-icon ${transaction.type}\\">
                        ${transaction.type === 'debit' ? '↓' : '↑'}
                    </div>
                    <div class=\\"transaction-details\\">
                        <h4>${transaction.name}</h4>
                        <p>${formatDate(transaction.date)}</p>
                    </div>
                </div>
                <div class=\\"transaction-amount ${transaction.type}\\">
                    ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
                </div>
            </div>
        `).join('');
    };
    
    // ==================== Accounts Page ====================
    
    const loadAccountsPage = () => {
        console.log('Loading accounts page');
        const data = getBankData();
        const container = document.getElementById('accountsList');
        if (!container) return;
        
        container.innerHTML = `
            <div class=\\"account-detail-card\\">
                <div class=\\"account-detail-header\\">
                    <div class=\\"account-info\\">
                        <h3>${data.accounts.checking.name}</h3>
                        <p>Account Number: ${data.accounts.checking.number}</p>
                        <p>Routing Number: ${data.accounts.checking.routing}</p>
                    </div>
                    <div class=\\"account-balance-large\\">$${data.accounts.checking.balance.toFixed(2)}</div>
                </div>
                <div class=\\"account-actions\\">
                    <button class=\\"btn-secondary\\" data-navigate=\\"transfer\\">Transfer</button>
                    <button class=\\"btn-secondary\\" data-navigate=\\"transactions\\">Transactions</button>
                </div>
            </div>
            
            <div class=\\"account-detail-card\\">
                <div class=\\"account-detail-header\\">
                    <div class=\\"account-info\\">
                        <h3>${data.accounts.savings.name}</h3>
                        <p>Account Number: ${data.accounts.savings.number}</p>
                        <p>Interest Rate: ${data.accounts.savings.interestRate}</p>
                    </div>
                    <div class=\\"account-balance-large\\">$${data.accounts.savings.balance.toFixed(2)}</div>
                </div>
                <div class=\\"account-actions\\">
                    <button class=\\"btn-secondary\\" data-navigate=\\"transfer\\">Transfer</button>
                    <button class=\\"btn-secondary\\" data-navigate=\\"transactions\\">Transactions</button>
                </div>
            </div>
            
            <div class=\\"account-detail-card\\">
                <div class=\\"account-detail-header\\">
                    <div class=\\"account-info\\">
                        <h3>${data.accounts.credit.name}</h3>
                        <p>Card Number: ${data.accounts.credit.number}</p>
                        <p>Credit Limit: $${data.accounts.credit.limit.toFixed(2)}</p>
                        <p>Available Credit: $${(data.accounts.credit.limit - data.accounts.credit.balance).toFixed(2)}</p>
                    </div>
                    <div class=\\"account-balance-large\\">$${data.accounts.credit.balance.toFixed(2)}</div>
                </div>
                <div class=\\"account-actions\\">
                    <button class=\\"btn-secondary\\" data-navigate=\\"bills\\">Pay Balance</button>
                    <button class=\\"btn-secondary\\" data-navigate=\\"transactions\\">Transactions</button>
                </div>
            </div>
        `;
    };
    
    // ==================== Transactions Page ====================
    
    const loadTransactionsTable = () => {
        console.log('Loading transactions table');
        const data = getBankData();
        const container = document.getElementById('transactionsTable');
        if (!container) return;
        
        const accountFilter = document.getElementById('accountFilter')?.value || 'all';
        const typeFilter = document.getElementById('typeFilter')?.value || 'all';
        const dateFilter = document.getElementById('dateFilter')?.value;
        
        let filteredTransactions = [...data.transactions];
        
        if (accountFilter !== 'all') {
            filteredTransactions = filteredTransactions.filter(t => t.account === accountFilter);
        }
        
        if (typeFilter !== 'all') {
            filteredTransactions = filteredTransactions.filter(t => t.type === typeFilter);
        }
        
        if (dateFilter) {
            filteredTransactions = filteredTransactions.filter(t => t.date === dateFilter);
        }
        
        if (filteredTransactions.length === 0) {
            container.innerHTML = '<div style=\\"padding: 2rem; text-align: center; color: #718096;\\">No transactions found</div>';
            return;
        }
        
        container.innerHTML = `
            <table style=\\"width: 100%; border-collapse: collapse;\\">
                <thead>
                    <tr style=\\"background: #f7fafc; border-bottom: 2px solid #e2e8f0;\\">
                        <th style=\\"padding: 1rem; text-align: left; font-weight: 600;\\">Date</th>
                        <th style=\\"padding: 1rem; text-align: left; font-weight: 600;\\">Description</th>
                        <th style=\\"padding: 1rem; text-align: left; font-weight: 600;\\">Category</th>
                        <th style=\\"padding: 1rem; text-align: left; font-weight: 600;\\">Account</th>
                        <th style=\\"padding: 1rem; text-align: right; font-weight: 600;\\">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredTransactions.map(transaction => `
                        <tr style=\\"border-bottom: 1px solid #e2e8f0; transition: all 0.3s ease;\\" 
                            onmouseover=\\"this.style.background='#f7fafc'\\" 
                            onmouseout=\\"this.style.background='white'\\">
                            <td style=\\"padding: 1rem;\\">${formatDate(transaction.date)}</td>
                            <td style=\\"padding: 1rem; font-weight: 600;\\">${transaction.name}</td>
                            <td style=\\"padding: 1rem;\\"><span style=\\"background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem;\\">${transaction.category}</span></td>
                            <td style=\\"padding: 1rem; text-transform: capitalize;\\">${transaction.account}</td>
                            <td style=\\"padding: 1rem; text-align: right; font-weight: 700; color: ${transaction.type === 'debit' ? '#e53e3e' : '#38b2ac'};\\">
                                ${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };
    
    const accountFilter = document.getElementById('accountFilter');
    const typeFilter = document.getElementById('typeFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (accountFilter) accountFilter.addEventListener('change', loadTransactionsTable);
    if (typeFilter) typeFilter.addEventListener('change', loadTransactionsTable);
    if (dateFilter) dateFilter.addEventListener('change', loadTransactionsTable);
    
    // ==================== Transfer Page ====================
    
    const loadTransferPage = () => {
        console.log('Loading transfer page');
        const data = getBankData();
        
        const fromAccount = document.getElementById('fromAccount');
        const toAccount = document.getElementById('toAccount');
        
        if (fromAccount && toAccount) {
            const accountOptions = `
                <option value=\\"\\">Select Account</option>
                <option value=\\"checking\\">${data.accounts.checking.name} (**** ${data.accounts.checking.number.slice(-4)}) - $${data.accounts.checking.balance.toFixed(2)}</option>
                <option value=\\"savings\\">${data.accounts.savings.name} (**** ${data.accounts.savings.number.slice(-4)}) - $${data.accounts.savings.balance.toFixed(2)}</option>
            `;
            
            fromAccount.innerHTML = accountOptions;
            toAccount.innerHTML = accountOptions + '<option value=\\"external\\">External Account</option>';
        }
    };
    
    const transferForm = document.getElementById('transferForm');
    if (transferForm) {
        transferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Transfer form submitted');
            
            const fromAccount = document.getElementById('fromAccount').value;
            const toAccount = document.getElementById('toAccount').value;
            const amount = parseFloat(document.getElementById('transferAmount').value);
            const description = document.getElementById('transferDescription').value || 'Transfer';
            
            if (!fromAccount || !toAccount) {
                alert('Please select both accounts');
                return;
            }
            
            if (fromAccount === toAccount) {
                alert('Please select different accounts for transfer');
                return;
            }
            
            const data = getBankData();
            
            if (data.accounts[fromAccount].balance < amount) {
                alert('Insufficient balance in source account');
                return;
            }
            
            // Update balances
            data.accounts[fromAccount].balance -= amount;
            
            if (toAccount !== 'external') {
                data.accounts[toAccount].balance += amount;
            }
            
            // Add transactions
            const now = new Date().toISOString().split('T')[0];
            const newTransactionId = Math.max(...data.transactions.map(t => t.id), 0) + 1;
            
            data.transactions.unshift({
                id: newTransactionId,
                name: `Transfer to ${toAccount === 'external' ? 'External Account' : data.accounts[toAccount].name}`,
                date: now,
                amount: -amount,
                type: 'debit',
                category: 'Transfer',
                account: fromAccount,
                description: description
            });
            
            if (toAccount !== 'external') {
                data.transactions.unshift({
                    id: newTransactionId + 1,
                    name: `Transfer from ${data.accounts[fromAccount].name}`,
                    date: now,
                    amount: amount,
                    type: 'credit',
                    category: 'Transfer',
                    account: toAccount,
                    description: description
                });
            }
            
            saveBankData(data);
            
            showModal(
                'Transfer Successful!',
                `$${amount.toFixed(2)} has been transferred from ${data.accounts[fromAccount].name} to ${toAccount === 'external' ? 'External Account' : data.accounts[toAccount].name}.`
            );
            
            this.reset();
            loadOverviewPage();
        });
    }
    
    // ==================== Loans Page ====================
    
    const loadLoansPage = () => {
        console.log('Loading loans page');
        const data = getBankData();
        const container = document.getElementById('loansGrid');
        if (!container) return;
        
        container.innerHTML = data.loans.map(loan => {
            const percentPaid = ((loan.originalAmount - loan.balance) / loan.originalAmount * 100).toFixed(0);
            
            return `
                <div class=\\"loan-detail-card\\">
                    <div class=\\"loan-header\\">
                        <h3>${loan.icon} ${loan.name}</h3>
                        <span class=\\"loan-status ${loan.status}\\">${loan.status}</span>
                    </div>
                    <div class=\\"loan-details\\">
                        <div class=\\"loan-info-row\\">
                            <span>Loan Amount</span>
                            <strong>$${loan.originalAmount.toFixed(2)}</strong>
                        </div>
                        <div class=\\"loan-info-row\\">
                            <span>Outstanding Balance</span>
                            <strong>$${loan.balance.toFixed(2)}</strong>
                        </div>
                        <div class=\\"loan-info-row\\">
                            <span>Interest Rate</span>
                            <strong>${loan.interestRate}</strong>
                        </div>
                        <div class=\\"loan-info-row\\">
                            <span>Monthly Payment</span>
                            <strong>$${loan.monthlyPayment.toFixed(2)}</strong>
                        </div>
                        <div class=\\"loan-info-row\\">
                            <span>Next Payment Due</span>
                            <strong>${formatDate(loan.nextPaymentDate)}</strong>
                        </div>
                    </div>
                    <div class=\\"loan-progress\\">
                        <div class=\\"progress-bar\\">
                            <div class=\\"progress-fill\\" style=\\"width: ${percentPaid}%\\"></div>
                        </div>
                        <p>${percentPaid}% Paid</p>
                    </div>
                    <button class=\\"btn-primary\\" onclick=\\"makeLoanPayment('${loan.id}')\\">Make Payment</button>
                </div>
            `;
        }).join('');
    };
    
    window.makeLoanPayment = (loanId) => {
        console.log('Making loan payment for:', loanId);
        const amount = prompt('Enter payment amount:');
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        const paymentAmount = parseFloat(amount);
        const data = getBankData();
        
        const loan = data.loans.find(l => l.id === loanId);
        if (!loan) return;
        
        if (data.accounts.checking.balance < paymentAmount) {
            alert('Insufficient balance in checking account');
            return;
        }
        
        loan.balance = Math.max(0, loan.balance - paymentAmount);
        data.accounts.checking.balance -= paymentAmount;
        
        const now = new Date().toISOString().split('T')[0];
        const newTransactionId = Math.max(...data.transactions.map(t => t.id), 0) + 1;
        
        data.transactions.unshift({
            id: newTransactionId,
            name: `${loan.name} Payment`,
            date: now,
            amount: -paymentAmount,
            type: 'debit',
            category: 'Loan Payment',
            account: 'checking'
        });
        
        const nextDate = new Date(loan.nextPaymentDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        loan.nextPaymentDate = nextDate.toISOString().split('T')[0];
        
        saveBankData(data);
        
        showModal(
            'Payment Successful!',
            `$${paymentAmount.toFixed(2)} has been paid towards your ${loan.name}. New balance: $${loan.balance.toFixed(2)}`
        );
        
        loadLoansPage();
        loadOverviewPage();
    };
    
    // ==================== Bills Page ====================
    
    const loadBillsPage = () => {
        console.log('Loading bills page');
        const data = getBankData();
        
        const billFromAccount = document.getElementById('billFromAccount');
        if (billFromAccount) {
            billFromAccount.innerHTML = `
                <option value=\\"\\">Select Account</option>
                <option value=\\"checking\\">${data.accounts.checking.name} (**** ${data.accounts.checking.number.slice(-4)}) - $${data.accounts.checking.balance.toFixed(2)}</option>
                <option value=\\"savings\\">${data.accounts.savings.name} (**** ${data.accounts.savings.number.slice(-4)}) - $${data.accounts.savings.balance.toFixed(2)}</option>
            `;
        }
        
        const today = new Date().toISOString().split('T')[0];
        const billDateInput = document.getElementById('billDate');
        if (billDateInput) {
            billDateInput.value = today;
        }
        
        const recentBillsList = document.getElementById('recentBillsList');
        if (recentBillsList) {
            const recentBills = data.billPayments ? data.billPayments.slice(0, 5) : [];
            
            if (recentBills.length === 0) {
                recentBillsList.innerHTML = '<p style=\\"text-align: center; color: #718096; padding: 2rem;\\">No bill payments yet</p>';
            } else {
                recentBillsList.innerHTML = recentBills.map(bill => `
                    <div class=\\"bill-item\\">
                        <div class=\\"bill-info\\">
                            <strong>${bill.payee}</strong>
                            <span>${formatDate(bill.date)}</span>
                        </div>
                        <div class=\\"bill-amount\\">$${bill.amount.toFixed(2)}</div>
                    </div>
                `).join('');
            }
        }
    };
    
    const billPaymentForm = document.getElementById('billPaymentForm');
    if (billPaymentForm) {
        billPaymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Bill payment form submitted');
            
            const payee = document.getElementById('payee').value;
            const fromAccount = document.getElementById('billFromAccount').value;
            const amount = parseFloat(document.getElementById('billAmount').value);
            const date = document.getElementById('billDate').value;
            const accountNumber = document.getElementById('billAccountNumber').value;
            
            if (!payee || !fromAccount) {
                alert('Please fill in all required fields');
                return;
            }
            
            const data = getBankData();
            
            if (data.accounts[fromAccount].balance < amount) {
                alert('Insufficient balance in selected account');
                return;
            }
            
            data.accounts[fromAccount].balance -= amount;
            
            if (!data.billPayments) {
                data.billPayments = [];
            }
            
            data.billPayments.unshift({
                payee: payee,
                amount: amount,
                date: date,
                accountNumber: accountNumber,
                fromAccount: fromAccount
            });
            
            const newTransactionId = Math.max(...data.transactions.map(t => t.id), 0) + 1;
            data.transactions.unshift({
                id: newTransactionId,
                name: `Bill Payment - ${payee}`,
                date: date,
                amount: -amount,
                type: 'debit',
                category: 'Bills',
                account: fromAccount
            });
            
            saveBankData(data);
            
            showModal(
                'Payment Successful!',
                `Your bill payment of $${amount.toFixed(2)} to ${payee} has been processed.`
            );
            
            this.reset();
            loadBillsPage();
            loadOverviewPage();
        });
    }
    
    // ==================== Profile Page ====================
    
    const loadProfilePage = () => {
        console.log('Loading profile page');
        const data = getBankData();
        
        document.getElementById('profileName').value = data.user.name;
        document.getElementById('profileEmail').value = data.user.email;
        document.getElementById('profilePhone').value = data.user.phone;
        document.getElementById('profileAddress').value = data.user.address;
        document.getElementById('profileCity').value = data.user.city;
        document.getElementById('profileState').value = data.user.state;
        document.getElementById('profileZip').value = data.user.zip;
        
        document.getElementById('profileNameDisplay').textContent = data.user.name;
        document.getElementById('memberSince').textContent = data.user.memberSince;
        document.getElementById('totalTransactions').textContent = data.transactions.length;
        document.getElementById('totalAccounts').textContent = Object.keys(data.accounts).length;
        document.getElementById('activeLoans').textContent = data.loans.filter(l => l.status === 'active').length;
        
        updateUserDisplay();
    };
    
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Profile form submitted');
            
            const data = getBankData();
            
            data.user.name = document.getElementById('profileName').value;
            data.user.email = document.getElementById('profileEmail').value;
            data.user.phone = document.getElementById('profilePhone').value;
            data.user.address = document.getElementById('profileAddress').value;
            data.user.city = document.getElementById('profileCity').value;
            data.user.state = document.getElementById('profileState').value;
            data.user.zip = document.getElementById('profileZip').value;
            
            saveBankData(data);
            updateUserDisplay();
            
            showModal(
                'Profile Updated!',
                'Your profile information has been saved successfully.'
            );
        });
    }
    
    // ==================== Logout ====================
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                console.log('User logged out');
                localStorage.removeItem('userLoggedIn');
                window.location.href = 'index.html';
            }
        });
    }
    
    // Initialize overview page
    loadOverviewPage();
}

// ==================== Utility Functions ====================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function showModal(title, message) {
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal on background click
const successModal = document.getElementById('successModal');
if (successModal) {
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

console.log('SecureBank - All functions loaded successfully!');
"
