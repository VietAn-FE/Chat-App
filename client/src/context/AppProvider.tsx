"use client";
import { createContext, useCallback, useContext, useState } from "react";

type ModalType = {
  component: React.ComponentType | null;
  props: Record<string, any>;
};

type AppContextType = {
  onShowModal: (
    component: React.ComponentType | any,
    props: Record<string, any>
  ) => void;
  onCloseModal: () => void;
} | null;

const AppContext = createContext<AppContextType>(null);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShow, setIsShow] = useState(false);
  const [modal, setModal] = useState<ModalType>({
    component: null,
    props: {},
  });

  const ComponentModalMain = modal.component;

  const onCloseModal = () => {
    setIsShow(false);
  };

  const onShowModal = (
    component: React.ComponentType,
    props: Record<string, any>
  ) => {
    setIsShow(true);
    setModal({
      component,
      props,
    });
  };

  const getValueContext = useCallback(() => {
    return {
      onShowModal,
      onCloseModal,
    };
  }, [onShowModal, onCloseModal]);

  return (
    <AppContext.Provider value={getValueContext()}>
      {children}
      {isShow && ComponentModalMain ? (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={onCloseModal}
          ></div>

          <ComponentModalMain {...modal.props} />
        </div>
      ): null}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default AppProvider;
