/**
 * TESTING & DEBUGGING VALIDATION
 * 
 * Tài liệu này giúp sinh viên kiểm tra validation khi phát triển
 * Sử dụng Chrome Developer Tools (F12)
 */

// ============================================
// 1. KIỂM TRA VALIDATION HOẠT ĐỘNG
// ============================================

/**
 * Dán vào Console (F12) để test
 */

// Kiểm tra validation.js đã được load chưa
if (typeof ValidationRules !== 'undefined') {
    console.log('✅ validation.js đã được load');
    console.log('Các rules:', Object.keys(ValidationRules));
} else {
    console.error('❌ validation.js chưa được load');
}

// ============================================
// 2. TEST TỪNG RULE
// ============================================

/**
 * Test email validation
 */
console.log('--- Test Email ---');
console.log('Valid:', ValidationRules.email('user@example.com'));      // ''
console.log('Invalid:', ValidationRules.email('invalid-email'));        // Error
console.log('Empty:', ValidationRules.email(''));                       // Error

/**
 * Test password validation
 */
console.log('--- Test Password ---');
console.log('Valid:', ValidationRules.password('123456'));              // ''
console.log('Short:', ValidationRules.password('123'));                 // Error
console.log('Empty:', ValidationRules.password(''));                    // Error

/**
 * Test phone validation
 */
console.log('--- Test Phone ---');
console.log('Valid:', ValidationRules.phone('0912345678'));             // ''
console.log('Invalid:', ValidationRules.phone('912345678'));            // Error
console.log('Invalid:', ValidationRules.phone('08123456789'));          // Error

// ============================================
// 3. KIỂM TRA FORM ELEMENTS
// ============================================

/**
 * Kiểm tra các element của form
 */
function inspectForm(formId) {
    const form = document.getElementById(formId);
    
    if (!form) {
        console.error(`❌ Form #${formId} không tồn tại`);
        return;
    }
    
    console.log('✅ Form tìm thấy:', form);
    console.log('Các input:', Array.from(form.querySelectorAll('input, textarea, select')));
    
    // Lấy tất cả field names
    const formData = new FormData(form);
    console.log('Field names:', Array.from(formData.keys()));
    
    return form;
}

// Sử dụng: inspectForm('registerForm')

// ============================================
// 4. KIỂM TRA VALIDATION THỜI GIAN THỰC
// ============================================

/**
 * Kiểm tra xem validation real-time đã được attach chưa
 */
function checkRealtimeValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        console.log(`Input: ${input.name}`);
        console.log('  - Có blur listener:', input.onblur !== null);
        console.log('  - Có input listener:', input.oninput !== null);
        console.log('  - Class hiện tại:', input.className);
    });
}

// Sử dụng: checkRealtimeValidation('registerForm')

// ============================================
// 5. SIMULATE FORM SUBMISSION
// ============================================

/**
 * Test form submission
 */
function testFormValidation(formId, fieldConfigs) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error(`❌ Form #${formId} không tồn tại`);
        return;
    }
    
    console.log('🧪 Testing Form Validation...');
    console.log('Form:', form.id);
    console.log('Field configs:', fieldConfigs);
    
    // Validate form
    const isValid = validateForm(form, fieldConfigs);
    console.log('Kết quả validate:', isValid ? '✅ Hợp lệ' : '❌ Lỗi');
    
    // Hiển thị các input có lỗi
    Object.keys(fieldConfigs).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field && field.classList.contains('input-error')) {
            console.log(`❌ ${fieldName}: có lỗi`);
        } else if (field) {
            console.log(`✅ ${fieldName}: hợp lệ`);
        }
    });
}

// Sử dụng: testFormValidation('registerForm', {
//   email: 'email',
//   password: 'password'
// })

// ============================================
// 6. KIỂM TRA CSS
// ============================================

/**
 * Kiểm tra CSS validation được load chưa
 */
function checkValidationCSS() {
    const styleSheets = Array.from(document.styleSheets);
    const hasValidationCSS = styleSheets.some(sheet => 
        sheet.href && sheet.href.includes('validation-styles.css')
    );
    
    if (hasValidationCSS) {
        console.log('✅ Validation CSS đã được load');
    } else {
        console.warn('⚠️  Validation CSS chưa được load!');
        console.log('Hãy thêm: <link rel="stylesheet" href=".../validation-styles.css">');
    }
    
    // Kiểm tra các CSS rules
    try {
        const errorStyle = window.getComputedStyle(
            document.createElement('div')
        );
        console.log('CSS Classes:', {
            'input-error': '.input-error',
            'error-message': '.error-message',
            'input-valid': '.input-valid'
        });
    } catch (e) {
        console.error('Lỗi khi kiểm tra CSS:', e);
    }
}

// Sử dụng: checkValidationCSS()

// ============================================
// 7. LOG TẤT CẢ SỰ KIỆN FORM
// ============================================

/**
 * Log tất cả input events để debug
 */
function debugFormEvents(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    console.log('🔍 Debugging Form Events...');
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        // Blur event
        input.addEventListener('blur', () => {
            console.log(`💤 Blur on ${input.name}:`, input.value);
        });
        
        // Input event
        input.addEventListener('input', () => {
            console.log(`✏️  Input on ${input.name}:`, input.value);
        });
        
        // Change event
        input.addEventListener('change', () => {
            console.log(`🔄 Change on ${input.name}:`, input.value);
        });
    });
    
    // Submit event
    form.addEventListener('submit', (e) => {
        console.log('📤 Form submitted');
        console.log('Form data:', Object.fromEntries(new FormData(form)));
    });
}

// Sử dụng: debugFormEvents('registerForm')

// ============================================
// 8. CLEAR TẤT CẢ ERRORS
// ============================================

/**
 * Xóa tất cả error messages từ form
 */
function clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        removeError(input);
    });
    
    console.log('✅ Đã xóa tất cả error messages');
}

// Sử dụng: clearAllErrors('registerForm')

// ============================================
// 9. FILL FORM AUTOMATICALLY (TESTING)
// ============================================

/**
 * Điền tự động dữ liệu hợp lệ vào form
 */
function autoFillForm(formId, data) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error('Form không tìm thấy');
        return;
    }
    
    Object.entries(data).forEach(([name, value]) => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field) {
            if (field.type === 'radio' || field.type === 'checkbox') {
                document.querySelector(`[name="${name}"][value="${value}"]`).checked = true;
            } else {
                field.value = value;
                field.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });
    
    console.log('✅ Đã điền dữ liệu vào form');
}

// Sử dụng:
// autoFillForm('registerForm', {
//   name: 'Nguyen Van A',
//   email: 'user@example.com',
//   password: '123456',
//   phone: '0912345678'
// });

// ============================================
// 10. PERFORMANCE CHECK
// ============================================

/**
 * Kiểm tra performance của validation
 */
function checkValidationPerformance(formId, fieldConfigs) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    console.time('⏱️  Validation Performance');
    
    // Chạy validation 100 lần
    for (let i = 0; i < 100; i++) {
        validateForm(form, fieldConfigs);
    }
    
    console.timeEnd('⏱️  Validation Performance');
}

// Sử dụng: checkValidationPerformance('registerForm', {
//   email: 'email',
//   password: 'password'
// })

// ============================================
// HELPER - TÓME TẮT BỘ TEST
// ============================================

/**
 * Chạy tất cả test cùng lúc
 */
function runAllTests(formId, fieldConfigs) {
    console.clear();
    console.log('═══════════════════════════════════');
    console.log('🧪 VALIDATION TEST SUITE');
    console.log('═══════════════════════════════════');
    
    console.log('\n1️⃣  Checking setup...');
    if (typeof ValidationRules !== 'undefined') {
        console.log('✅ ValidationRules available');
    } else {
        console.error('❌ ValidationRules not found');
        return;
    }
    
    console.log('\n2️⃣  Checking CSS...');
    checkValidationCSS();
    
    console.log('\n3️⃣  Inspecting form...');
    inspectForm(formId);
    
    console.log('\n4️⃣  Testing validation...');
    testFormValidation(formId, fieldConfigs);
    
    console.log('\n5️⃣  Checking performance...');
    checkValidationPerformance(formId, fieldConfigs);
    
    console.log('\n═══════════════════════════════════');
    console.log('✅ TEST COMPLETED');
    console.log('═══════════════════════════════════\n');
}

// Sử dụng: runAllTests('registerForm', {
//   email: 'email',
//   password: 'password',
//   name: 'fullname'
// })

// ============================================
// EXPORT - DỰA DÙNG TRONG CONSOLE
// ============================================

console.log('%c=== VALIDATION DEBUG TOOLS ===', 'color: blue; font-weight: bold');
console.log('Các hàm có sẵn:');
console.log('  - inspectForm(formId)');
console.log('  - checkRealtimeValidation(formId)');
console.log('  - testFormValidation(formId, fieldConfigs)');
console.log('  - checkValidationCSS()');
console.log('  - debugFormEvents(formId)');
console.log('  - clearAllErrors(formId)');
console.log('  - autoFillForm(formId, data)');
console.log('  - checkValidationPerformance(formId, fieldConfigs)');
console.log('  - runAllTests(formId, fieldConfigs)');
console.log('\nVí dụ: runAllTests("registerForm", {email: "email", password: "password"})');
