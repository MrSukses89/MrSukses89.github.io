# Variabel awal
karakter = "Kael"
lokasi = "Tepi Hutan"
item = ["kalung", "pedang"]

# Fungsi untuk menampilkan adegan
def tepi_hutan():
    print(f"{karakter} berdiri di tepi hutan. Menara kuno terlihat jauh.")
    print("Pilihan:")
    print("1. Lewat jembatan")
    print("2. Ambil jalur samping")
    print("3. Periksa kalung")
    
    pilihan = input("Apa yang kamu lakukan? (1/2/3): ")
    
    if pilihan == "1":
        jembatan()
    elif pilihan == "2":
        jalur_samping()
    elif pilihan == "3":
        periksa_kalung()
    else:
        print("Pilihan salah, coba lagi.")
        tepi_hutan()

def jembatan():
    print("Jembatan berderit keras. Tiba-tiba tali putus! Kael jatuh ke sungai.")
    # Lanjutkan ke adegan berikutnya

def jalur_samping():
    print("Kael menemukan jejak aneh di lumpur. Ada suara dari semak.")
    # Lanjutkan ke adegan berikutnya

def periksa_kalung():
    print("Kalung Kael bersinar samar. Ada suara bisikan: 'Ke menara...'")
    # Lanjutkan ke adegan berikutnya

# Mulai game
tepi_hutan()