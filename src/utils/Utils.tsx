
export default function Paras() {
    return Array.from(
        { length: 40 },
        (_, i) => (
            <p key={i}>
                Paragraph {i}
            </p>
        )
    );
}