type ProtectedProps = {
  condition: boolean;
  children: React.ReactNode;
};

const ProtectedContent = ({ condition, children }: ProtectedProps) => {
  return <>{condition ? children : null}</>;
};

export default ProtectedContent;
