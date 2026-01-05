export default function MobileOnlyOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="max-w-sm text-center px-6">
                <h2 className="text-white text-2xl font-semibold mb-4">
                    Запрошення доступне лише з телефону
                </h2>

                <p className="text-gray-300 mb-6">
                    Будь ласка, відкрийте запрошення на мобільному пристрої
                </p>

                <div className="text-6xl">📱</div>
            </div>
        </div>
    );
}