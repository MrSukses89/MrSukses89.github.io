using UnityEngine;

public class KaelController : MonoBehaviour {
    public float speed = 5f; // Kecepatan gerak Kael
    private Rigidbody2D rb;
    private Animator animator; // Untuk animasi (jalan, idle, dll.)

    void Start() {
        rb = GetComponent<Rigidbody2D>();
        animator = GetComponent<Animator>();
    }

    void Update() {
        // Gerakan Kael pakai WASD atau arrow keys
        float moveX = Input.GetAxisRaw("Horizontal");
        float moveY = Input.GetAxisRaw("Vertical");
        Vector2 movement = new Vector2(moveX, moveY).normalized * speed;
        rb.velocity = movement;

        // Update animasi
        if (movement != Vector2.zero) {
            animator.SetBool("isWalking", true);
        } else {
            animator.SetBool("isWalking", false);
        }
    }
}