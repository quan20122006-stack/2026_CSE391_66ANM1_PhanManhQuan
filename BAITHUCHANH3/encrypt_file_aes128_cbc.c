#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/evp.h>
#include <openssl/err.h>

// Convert hex string to byte array
int hex_to_bytes(const char *hex, unsigned char *bytes, size_t len) {
    for (size_t i = 0; i < len; ++i) {
        if (sscanf(hex + 2*i, "%2hhx", &bytes[i]) != 1)
            return 0;
    }
    return 1;
}

void handleErrors() {
    ERR_print_errors_fp(stderr);
    abort();
}

int main() {
    char key_hex[33], iv_hex[33];
    unsigned char key[16], iv[16];

    printf("Enter 128-bit key in hex (32 chars): ");
    scanf("%32s", key_hex);

    printf("Enter 128-bit IV in hex (32 chars): ");
    scanf("%32s", iv_hex);

    if (!hex_to_bytes(key_hex, key, 16) || !hex_to_bytes(iv_hex, iv, 16)) {
        fprintf(stderr, "Invalid hex format\n");
        return 1;
    }

    const char *in_filename = "plain.txt";
    const char *out_filename = "encrypted.aes";

    FILE *in_file = fopen(in_filename, "rb");
    FILE *out_file = fopen(out_filename, "wb");
    if (!in_file || !out_file) {
        perror("File error");
        return 1;
    }

    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    if (!ctx) handleErrors();

    if (EVP_EncryptInit_ex(ctx, EVP_aes_128_cbc(), NULL, key, iv) != 1)
        handleErrors();

    unsigned char inbuf[1024], outbuf[1040];
    int inlen, outlen;

    while ((inlen = fread(inbuf, 1, sizeof(inbuf), in_file)) > 0) {
        if (EVP_EncryptUpdate(ctx, outbuf, &outlen, inbuf, inlen) != 1)
            handleErrors();
        fwrite(outbuf, 1, outlen, out_file);
    }

    if (EVP_EncryptFinal_ex(ctx, outbuf, &outlen) != 1)
        handleErrors();
    fwrite(outbuf, 1, outlen, out_file);

    EVP_CIPHER_CTX_free(ctx);
    fclose(in_file);
    fclose(out_file);

    printf("Encryption complete. Output file: %s\n", out_filename);
    return 0;
}
