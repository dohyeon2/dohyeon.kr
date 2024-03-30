export const generateRandomUserName = () => {
    const prefixes = [
        "황홀한",
        "놀라운",
        "아름다운",
        "흥미로운",
        "매혹적인",
        "눈부신",
        "멋진",
        "훌륭한",
        "대단한",
        "뛰어난",
    ];
    const suffixes = [
        "바지",
        "자동차",
        "컴퓨터",
        "텔레비전",
        "자전거",
        "휴대폰",
        "책",
        "의자",
        "테이블",
        "침대",
    ];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${randomPrefix} ${randomSuffix}`;
};
