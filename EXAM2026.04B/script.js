document.addEventListener('DOMContentLoaded', () => {
    const clubContainer = document.getElementById('clubContainer');
    const overlay = document.getElementById('popupOverlay');
    const form = document.getElementById('clubForm');

    // Mở / Đóng form
    document.getElementById('btnOpenAdd').onclick = () => overlay.style.display = 'flex';
    
    const closeForm = () => { 
        overlay.style.display = 'none'; 
        form.reset(); 
    };
    
    document.getElementById('btnClose').onclick = closeForm;
    document.getElementById('btnCancel').onclick = closeForm;

    // Hàm chuyển đổi định dạng yyyy-mm-dd sang dd/mm/yyyy
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }

    // Render dữ liệu (KHÔNG CÓ NÚT XÓA)
    function renderCards() {
        clubContainer.innerHTML = '';
        clubData.forEach((club) => {
            clubContainer.innerHTML += `
                <div class="club-card">
                    <h3>${club.name}</h3>
                    <p><strong>Chủ nhiệm:</strong> ${club.president}</p>
                    <p><strong>Email:</strong> ${club.email}</p>
                    <p><strong>Điện thoại:</strong> ${club.phone}</p>
                    <p><strong>Ngày thành lập:</strong> ${formatDate(club.establishDate)}</p>
                </div>
            `;
        });
    }

    // Thêm nhân sự & Validate
    form.onsubmit = (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu
        const name = document.getElementById('name').value.trim();
        const president = document.getElementById('president').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const establishDate = document.getElementById('establishDate').value;

        // Validate
        if (name.length > 40) return alert('Lỗi: Tên câu lạc bộ không được vượt quá 40 ký tự!');
        if (!/^[0-9]{10}$/.test(phone)) return alert('Lỗi: Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số!');
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const inputDate = new Date(establishDate);
        if (inputDate > today) return alert('Lỗi: Ngày thành lập không được lớn hơn ngày hiện tại!');

        // Thêm vào mảng Data
        clubData.push({ 
            id: Date.now(), 
            name, 
            president, 
            email, 
            phone, 
            establishDate 
        });

        // Cập nhật giao diện
        renderCards();
        closeForm();
        alert('Đã thêm câu lạc bộ thành công!');
    };

    // Khởi chạy render lần đầu tiên
    renderCards();
});