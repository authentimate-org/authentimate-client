
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }: { url: string }) => {
  return (
    <div>
      <h2>Scan this QR Code</h2>
      <QRCode value={url} size={256} />
    </div>
  );
};

export default QRCodeGenerator;
