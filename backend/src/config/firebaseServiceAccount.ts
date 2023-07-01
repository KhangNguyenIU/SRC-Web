import { Environment } from "./environment.config";

export const firebaseServiceAccount = {
    type: "service_account",
    projectId: "src-noti",
    privateKeyId: Environment.FRB_P_KEY_ID,
    privateKey: Environment.FRB_P_KEY.replace(/\\n/gm, "\n"),
    clientEmail: Environment.FRB_CLIENT_EMAIL,
    clientId: Environment.FRB_CLIENT_ID,
    authUri: Environment.FRB_AUTH_URI,
    tokenUri: Environment.FRB_TOKEN_URI,
    authProviderX509CertUrl: Environment.FRB_AUTH_PROVIDER_X509_CERT_URL,
    clientC509CertUrl: Environment.FRB_CLIENT_X509_CERT_URL,
}