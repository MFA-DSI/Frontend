import { Modal, Button } from "antd";
import { generateExcelFile } from "../utils/generateExcelfile";

const ApprobateUserModal = ({
  title,
  visible,
  onCancel,
  responseData,
  children,
}) => {
  const handleExport = () => {
    if (responseData) {
      generateExcelFile(responseData);
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="export" onClick={handleExport} disabled={!responseData}>
          Exporter ces identifiants
        </Button>,
        <Button key="close" onClick={onCancel}>
          Fermer
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ApprobateUserModal;
