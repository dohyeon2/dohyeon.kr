// 네비게이션 서비스 - 전역 객체로 사용
export const NavigationService = {
    /**
     * 지정된 경로로 네비게이션을 수행합니다.
     * @param path 이동할 경로
     */
    navigateTo(path: string): void {
        // 브라우저 히스토리에 새 상태 추가
        window.history.pushState({}, "", path);

        // 네비게이션 이벤트 발생
        const event = new CustomEvent("navigate", {
            bubbles: true,
            composed: true,
            detail: { path },
        });

        // document 레벨에서 이벤트 발생
        document.dispatchEvent(event);
    },
};

// 타입스크립트 전역 선언 (선택 사항)
declare global {
    interface Window {
        NavigationService: typeof NavigationService;
    }
}

// 전역 객체로 등록 (선택 사항)
window.NavigationService = NavigationService;
