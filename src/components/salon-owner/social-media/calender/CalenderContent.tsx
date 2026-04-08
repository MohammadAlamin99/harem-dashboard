import { Plus } from "lucide-react";
import PageHeaderWithButton from "../../common-component/PageHeaderWithButton";
import { useState } from "react";
import AddPostModal from "./AddPostModal";

export default function CalenderContent() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <div>
      <PageHeaderWithButton
        title="Calendar"
        buttons={[
          {
            icon: <Plus size={16} color="white" />,
            onClick: () => setIsOpen(true),
            label: "Add Post",
            variant: "primary",
          },
        ]}
      />
      {/* add post modal */}
      {isOpen && <AddPostModal isOpen={isOpen} onClose={onClose} />}
    </div>
  );
}
