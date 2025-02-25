// DOM が完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロールの実装
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ログインフォームのバリデーション（モックページ用）
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // ログイン成功の処理（実際のシステムではAPI通信などが必要）
                const userType = document.querySelector('body').dataset.userType;
                window.location.href = `dashboard.html`;
            } else {
                alert('ユーザー名とパスワードを入力してください');
            }
        });
    }

    // タブUIのナビゲーション機能 - 改良版
    function initTabs() {
        console.log('Tab initialization started');
        const mockTabItems = document.querySelectorAll('.mock-tabs ul li a');
        console.log('Found tab items:', mockTabItems.length);
        
        if (mockTabItems.length > 0) {
            mockTabItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Tab clicked:', this.getAttribute('data-target'));
                    
                    // アクティブなタブのクラスを更新
                    mockTabItems.forEach(tabItem => {
                        tabItem.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // コンテンツエリアの更新
                    const targetId = this.getAttribute('data-target');
                    if (targetId) {
                        const contentSections = document.querySelectorAll('.mock-content-section');
                        console.log('Content sections found:', contentSections.length);
                        
                        contentSections.forEach(section => {
                            section.style.display = 'none';
                            section.classList.remove('active');
                        });
                        
                        const targetSection = document.getElementById(targetId);
                        if (targetSection) {
                            console.log('Target section found:', targetId);
                            targetSection.style.display = 'block';
                            targetSection.classList.add('active');
                        } else {
                            console.log('Target section not found:', targetId);
                        }
                    }
                });
            });
            
            // 最初のタブをデフォルトでアクティブに
            console.log('Activating first tab');
            mockTabItems[0].click();
        }
    }
    
    // ページロード完了時にタブ初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
    } else {
        initTabs();
    }

    // サンプルデータテーブルの並び替え機能
    const sortableHeaders = document.querySelectorAll('.sortable');
    if (sortableHeaders.length > 0) {
        sortableHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const table = this.closest('table');
                const columnIndex = Array.from(this.parentNode.children).indexOf(this);
                const rows = Array.from(table.querySelectorAll('tbody tr'));
                
                // 昇順/降順の切り替え
                const isAscending = this.classList.contains('asc');
                
                // 他のヘッダーからソートクラスを削除
                sortableHeaders.forEach(h => {
                    h.classList.remove('asc', 'desc');
                });
                
                // 現在のヘッダーにソートクラスを設定
                this.classList.add(isAscending ? 'desc' : 'asc');
                
                // テーブル行をソート
                rows.sort((rowA, rowB) => {
                    const cellA = rowA.querySelectorAll('td')[columnIndex].textContent;
                    const cellB = rowB.querySelectorAll('td')[columnIndex].textContent;
                    
                    return isAscending
                        ? cellB.localeCompare(cellA)
                        : cellA.localeCompare(cellB);
                });
                
                // ソートされた行をテーブルに戻す
                rows.forEach(row => {
                    table.querySelector('tbody').appendChild(row);
                });
            });
        });
    }
});

// モックデータを生成する関数（デモページ用）
function generateMockData() {
    // ワイン生産者データ
    const producers = [
        { id: 1, name: 'シャトー・マルゴー', region: 'ボルドー', country: 'フランス' },
        { id: 2, name: 'アンティノリ', region: 'トスカーナ', country: 'イタリア' },
        { id: 3, name: '高山ワイナリー', region: '山梨県', country: '日本' },
        { id: 4, name: 'オーパス・ワン', region: 'ナパバレー', country: 'アメリカ' },
        { id: 5, name: 'ペンフォールズ', region: 'バロッサバレー', country: 'オーストラリア' }
    ];
    
    // ワイン商品データ
    const wines = [
        { id: 101, name: 'シャトー・マルゴー 2018', type: '赤ワイン', grape: 'カベルネ・ソーヴィニヨン', price: 75000, stock: 24 },
        { id: 102, name: 'ティニャネロ 2019', type: '赤ワイン', grape: 'サンジョヴェーゼ', price: 22000, stock: 36 },
        { id: 103, name: '甲州樽熟成 2020', type: '白ワイン', grape: '甲州', price: 3800, stock: 120 },
        { id: 104, name: 'オーパス・ワン 2017', type: '赤ワイン', grape: 'カベルネ・ソーヴィニヨン', price: 45000, stock: 18 },
        { id: 105, name: 'グランジ 2016', type: '赤ワイン', grape: 'シラーズ', price: 98000, stock: 12 },
        { id: 106, name: 'プイィ・フュメ 2021', type: '白ワイン', grape: 'ソーヴィニヨン・ブラン', price: 6500, stock: 48 },
        { id: 107, name: 'バローロ 2015', type: '赤ワイン', grape: 'ネッビオーロ', price: 15000, stock: 30 },
        { id: 108, name: 'シャンパーニュ ブリュット', type: 'スパークリング', grape: 'シャルドネ', price: 8500, stock: 60 }
    ];
    
    // 顧客データ
    const customers = [
        { id: 201, name: 'レストラン オークドア', type: '高級レストラン', location: '東京都港区' },
        { id: 202, name: 'ビストロ パリジャン', type: 'カジュアルレストラン', location: '東京都渋谷区' },
        { id: 203, name: 'ワインバー セラーズ', type: 'ワインバー', location: '大阪市北区' },
        { id: 204, name: 'イタリアン トラットリア', type: 'イタリアンレストラン', location: '福岡市中央区' },
        { id: 205, name: 'ホテル グランデ', type: 'ホテル', location: '京都市東山区' }
    ];
    
    // 発注データ
    const orders = [
        { id: 301, customer: 'レストラン オークドア', date: '2025-02-20', status: '配送完了', total: 185000 },
        { id: 302, customer: 'ビストロ パリジャン', date: '2025-02-22', status: '処理中', total: 42000 },
        { id: 303, customer: 'ワインバー セラーズ', date: '2025-02-23', status: '発送準備中', total: 76500 },
        { id: 304, customer: 'イタリアン トラットリア', date: '2025-02-25', status: '新規', total: 51000 },
        { id: 305, customer: 'ホテル グランデ', date: '2025-02-26', status: '処理中', total: 320000 }
    ];
    
    // 市場データ
    const marketData = [
        { region: 'ボルドー', trend: '安定', demand: '高', priceChange: '+5%' },
        { region: 'ブルゴーニュ', trend: '上昇', demand: '非常に高', priceChange: '+12%' },
        { region: 'トスカーナ', trend: '安定', demand: '中程度', priceChange: '+2%' },
        { region: 'リオハ', trend: '下降', demand: '低', priceChange: '-3%' },
        { region: 'ナパバレー', trend: '上昇', demand: '高', priceChange: '+8%' },
        { region: '山梨県', trend: '急上昇', demand: '増加中', priceChange: '+15%' }
    ];
    
    return {
        producers,
        wines,
        customers,
        orders,
        marketData
    };
}

// チャートデータ（モックページ用）
function generateChartData() {
    return {
        salesByMonth: [
            { month: '1月', sales: 4200000 },
            { month: '2月', sales: 3800000 },
            { month: '3月', sales: 4500000 },
            { month: '4月', sales: 4100000 },
            { month: '5月', sales: 4300000 },
            { month: '6月', sales: 4700000 }
        ],
        salesByRegion: [
            { region: 'フランス', sales: 35 },
            { region: 'イタリア', sales: 25 },
            { region: 'スペイン', sales: 15 },
            { region: '日本', sales: 10 },
            { region: 'その他', sales: 15 }
        ],
        salesByType: [
            { type: '赤ワイン', sales: 45 },
            { type: '白ワイン', sales: 30 },
            { type: 'スパークリング', sales: 15 },
            { type: 'ロゼ', sales: 10 }
        ]
    };
}
