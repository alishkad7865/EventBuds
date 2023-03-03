import { IonPage, IonContent, IonButton, IonRow } from "@ionic/react";
import Menu from "../../components/Menu";

export default function Download() {
  const apk_url = "./EventbudsV1.2.apk";
  const download_APK = () => {
    const aTag = document.createElement("a");
    aTag.href = apk_url;
    aTag.setAttribute("download", "EventBudV1.2.apk");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <IonPage>
      <Menu page={"Download"} />
      <IonContent class="container">
        <h2 className="ion-text-center ion-text-capitalize">
          Download apk for Android
        </h2>
        <IonRow class="ion-justify-content-center">
          <IonButton onClick={() => download_APK()}>
            Download Android Apk V1.2
          </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
}
