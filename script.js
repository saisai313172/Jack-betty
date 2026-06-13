document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById('loader');
    const stage = document.getElementById('web-stage');

    /* ====================================================================
       ① スリムローディングのフェードアウト制御
    ==================================================================== */
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            stage.classList.add('ready');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 1500); // 1.5秒間演出を見せてからコンテンツを表示
    });

    // 万が一、loadイベントが正常に発火しない場合のセーフティタイマー
    setTimeout(() => {
        if (loader.style.display !== 'none') {
            loader.style.opacity = '0';
            stage.classList.add('ready');
            setTimeout(() => { loader.style.display = 'none'; }, 600);
        }
    }, 3000);


    /* ====================================================================
       ② 幻想的な背景浮遊パーティクル (ピンクネオンバージョン)
    ==================================================================== */
    const canvas = document.getElementById('bg-particles');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.size = Math.random() * 2.5 + 0.5; // スリムな極小の粒子
            this.speedY = Math.random() * 1.0 + 0.3; // ゆっくりと浮遊
            this.opacity = Math.random() * 0.3 + 0.05; // 控えめな透明度
        }
        update() {
            this.y -= this.speedY;
            if (this.y < -10) {
                this.y = height + 10;
                this.x = Math.random() * width;
            }
        }
        draw() {
            // ピンク（rgba(255, 42, 116)）の光の粒を生成
            ctx.fillStyle = `rgba(255, 42, 116, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // スリムな印象を与えるため、粒子の数は控えめに設定
        const count = window.innerWidth < 768 ? 25 : 60;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
            particles[i].y = Math.random() * height; // 初期状態は画面全体に散らす
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 画面サイズ変更時に粒子の配置を再計算
    window.addEventListener('resize', () => {
        initParticles();
    });

});