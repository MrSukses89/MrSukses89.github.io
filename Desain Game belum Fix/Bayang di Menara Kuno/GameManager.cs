using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour {
    public GameObject kael;
    public Text narasiText; // UI untuk cerita
    public Button[] pilihanButtons; // Tombol untuk opsi
    private string lokasi = "Tepi Hutan";

    void Start() {
        MulaiTepiHutan();
    }

    void MulaiTepiHutan() {
        lokasi = "Tepi Hutan";
        narasiText.text = "Kael berdiri di tepi hutan. Menara kuno terlihat jauh.";
        pilihanButtons[0].GetComponentInChildren<Text>().text = "Lewat jembatan";
        pilihanButtons[0].onClick.AddListener(PilihJembatan);
        pilihanButtons[1].GetComponentInChildren<Text>().text = "Ambil jalur samping";
        pilihanButtons[1].onClick.AddListener(PilihJalurSamping);
        pilihanButtons[2].GetComponentInChildren<Text>().text = "Periksa kalung";
        pilihanButtons[2].onClick.AddListener(PeriksaKalung);
    }

    void PilihJembatan() {
        lokasi = "Jembatan";
        narasiText.text = "Jembatan berderit keras. Tali putus! Kael jatuh ke sungai.";
        kael.transform.position = new Vector2(5, -2); // Pindah posisi Kael
        // Tambah animasi jatuh atau ganti scene
    }

    void PilihJalurSamping() {
        lokasi = "Jalur Samping";
        narasiText.text = "Kael menemukan jejak aneh di lumpur. Ada suara dari semak.";
        kael.transform.position = new Vector2(3, 1);
    }

    void PeriksaKalung() {
        narasiText.text = "Kalung Kael bersinar samar. Ada suara bisikan: 'Ke menara...'";
        // Tambah efek visual (partikel cahaya?)
    }
}