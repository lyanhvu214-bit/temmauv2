const fileInput = document.getElementById('file-input');
const uploadPrompt = document.getElementById('upload-prompt');
const previewContainer = document.getElementById('preview-container');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultContent = document.getElementById('result-content');

let selectedImage = null;

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            uploadPrompt.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            analyzeBtn.disabled = false;
            selectedImage = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

analyzeBtn.addEventListener('click', () => {
    if (!selectedImage) return;

    analyzeBtn.textContent = "Đang phân tích màu sắc...";
    analyzeBtn.disabled = true;

    setTimeout(() => {
        const scenarios = [
            {
                status: 'fresh',
                title: 'Hải sản tươi ngon',
                desc: 'Tem màu mang sắc tím hồng đặc trưng. Độ pH và chỉ số TVB-N ở mức an toàn tuyệt đối.',
                ph: '5.5',
                tvbn: '< 12 mg/100g',
                rgb: 'rgb(120, 80, 160)',
                colorHex: '#7850a0',
                bgClass: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
                icon: '🟢'
            }
        ];

        const res = scenarios[0];

        document.getElementById('status-badge').className = `p-4 rounded-xl border flex items-center gap-3 ${res.bgClass}`;
        document.getElementById('status-icon').textContent = res.icon;
        document.getElementById('status-title').textContent = res.title;
        document.getElementById('status-desc').textContent = res.desc;
        document.getElementById('val-ph').textContent = res.ph;
        document.getElementById('val-tvbn').textContent = res.tvbn;
        document.getElementById('val-rgb').textContent = res.rgb;
        document.getElementById('color-box').style.backgroundColor = res.colorHex;

        resultPlaceholder.classList.add('hidden');
        resultContent.classList.remove('hidden');

        analyzeBtn.textContent = "Phân Tích Độ Tươi";
        analyzeBtn.disabled = false;
    }, 1200);
});
