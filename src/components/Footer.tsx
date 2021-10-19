export default function Footer() {
  const dischargeDay = new Date(2022, 10, 17);
  const today = new Date();
  const dDay: number =
    Math.floor(
      (dischargeDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24
    ) + 1;

  return (
    <footer>
      <span>
        김포푸드뱅크 ☏ 031-983-1377 <strong>소집해제 D-{dDay}</strong>
      </span>
    </footer>
  );
}
