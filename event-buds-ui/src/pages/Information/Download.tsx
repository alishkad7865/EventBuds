import { IonPage, IonContent, IonButton, IonRow } from "@ionic/react";
import Menu from "../../components/Menu";

export default function Download() {
  const apk_url = "./EventBudsV1.4.apk";
  const download_APK = () => {
    const aTag = document.createElement("a");
    aTag.href = apk_url;
    aTag.setAttribute("download", "EventBudsV1.4.apk");
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
            Download Android Apk V1.4
          </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
}
