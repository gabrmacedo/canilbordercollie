/**
 * ==========================================================================
 * CANIL BORDER PLACE - JAVASCRIPT PRINCIPAL
 * Padrão: ECMAScript Moderno (Vanilla JS, sem dependências externas)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Configuração global editável pelo cliente
  const CANIL_CONFIG = {
  whatsappNumber: "5527998886460",
  instagramHandle: "canilborderplace",
  kennelName: "Canil Border Place"
};

   /* ========================================================================
   * 1. MENU MOBILE - CLONAR ITENS DO MENU ESQUERDO NO DIREITO
   * ======================================================================== */
  
  // ====== MENU MOBILE ======
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenuRight = document.querySelector(".header-nav-right");
 
  if (mobileToggle && navMenuRight) {
    mobileToggle.addEventListener("click", () => {
      navMenuRight.classList.toggle("is-active");
      const isOpen = navMenuRight.classList.contains("is-active");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
    });
 
    // Fechar ao clicar em qualquer link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenuRight.classList.remove("is-active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
 
    // Fechar ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navMenuRight.classList.remove("is-active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
 
    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {
      if (!navMenuRight.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenuRight.classList.remove("is-active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 2. DESTAQUE AUTOMÁTICO DO LINK DA PÁGINA ATUAL
   * ------------------------------------------------------------------------ */
  const navLinks = document.querySelectorAll(".nav-link");
  const markCurrentPageLink = () => {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const linkPath = href.split("/").pop();
        if (
          linkPath === currentPath ||
          (currentPath === "" && linkPath === "index.html") ||
          (currentPath === "/" && linkPath === "index.html")
        ) {
          link.classList.add("active");
          link.setAttribute("aria-current", "page");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      }
    });
  };
  markCurrentPageLink();

  /* ------------------------------------------------------------------------
   * 3. FILTROS DE FILHOTES (filhotes.html)
   * ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const puppyCards = document.querySelectorAll(".puppy-card");

  if (filterButtons.length > 0 && puppyCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const targetCategory = button.getAttribute("data-filter") || "all";

        puppyCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category") || "";
          const cardStatus = card.getAttribute("data-status") || "";

          let isMatch = false;
          if (targetCategory === "all") {
            isMatch = true;
          } else if (targetCategory === "disponivel" && cardStatus === "disponivel") {
            isMatch = true;
          } else if (targetCategory === "reservado" && cardStatus === "reservado") {
            isMatch = true;
          } else if (cardCategory.includes(targetCategory)) {
            isMatch = true;
          }

          if (isMatch) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.95)";
            setTimeout(() => {
              card.style.display = "none";
            }, 200);
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 4. FAQ ACCORDION (contato.html / o-canil.html)
   * ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");

      if (button && answer) {
        button.addEventListener("click", () => {
          const isOpen = item.classList.contains("active");

          // Fecha outros itens (opcional: efeito sanfona elegante)
          faqItems.forEach((other) => {
            if (other !== item) {
              other.classList.remove("active");
              const otherBtn = other.querySelector(".faq-question");
              const otherAns = other.querySelector(".faq-answer");
              if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
              if (otherAns) otherAns.style.maxHeight = null;
            }
          });

          if (isOpen) {
            item.classList.remove("active");
            button.setAttribute("aria-expanded", "false");
            answer.style.maxHeight = null;
          } else {
            item.classList.add("active");
            button.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
          }
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 5. BOTÕES DINÂMICOS DE INTERESSE VIA WHATSAPP
   * ------------------------------------------------------------------------ */
  const whatsappReserveBtns = document.querySelectorAll(".btn-reserve-puppy");
  whatsappReserveBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const puppyName = btn.getAttribute("data-puppy-name") || "um filhote";
      const puppyColor = btn.getAttribute("data-puppy-color") || "";
      const text = encodeURIComponent(
        `Olá, equipe do Canil Border Place! Tenho interesse no filhote ${puppyName} (${puppyColor}). Gostaria de mais informações sobre disponibilidade e reserva.`
      );
      const url = `https://wa.me/${CANIL_CONFIG.whatsappNumber}?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  /* ------------------------------------------------------------------------
   * 6. FORMULÁRIO DE CONTATO INTELIGENTE COM REDIRECIONAMENTO WHATSAPP
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("nome");
      const cityInput = document.getElementById("cidade");
      const phoneInput = document.getElementById("telefone");
      const interestSelect = document.getElementById("interesse");
      const messageInput = document.getElementById("mensagem");

      const name = nameInput?.value?.trim() || "";
      const city = cityInput?.value?.trim() || "";
      const phone = phoneInput?.value?.trim() || "";
      const interest = interestSelect?.value || "Geral";
      const message = messageInput?.value?.trim() || "";

      if (!name || !phone) {
        alert("Por favor, preencha ao menos seu nome e telefone/WhatsApp para contato.");
        return;
      }

      // Monta mensagem amigável para envio direto via WhatsApp
      const text = encodeURIComponent(
        `*Novo Contato - Site Canil Border Place*\n\n` +
        `*Nome:* ${name}\n` +
        `*Cidade/UF:* ${city || "Não informado"}\n` +
        `*WhatsApp:* ${phone}\n` +
        `*Interesse:* ${interest}\n` +
        `*Mensagem:* ${message || "Gostaria de saber mais sobre os filhotes."}`
      );

      const url = `https://wa.me/${CANIL_CONFIG.whatsappNumber}?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");

      // Feedback amigável para o usuário
      const formResponse = document.getElementById("formResponse");
      if (formResponse) {
        formResponse.style.display = "block";
        formResponse.innerHTML = `<p style="color: #10B981; font-weight: 600; margin-top: 1rem;">Obrigado, ${name}! Estamos abrindo a conversa no WhatsApp para atendê-lo com prioridade.</p>`;
      }
      contactForm.reset();
    });
  }
});
<script>
document.addEventListener("DOMContentLoaded", () => {

  const photos = document.querySelectorAll(".mural-photo");
  const lightbox = document.getElementById("muralLightbox");
  const lightboxImage = document.getElementById("muralLightboxImage");
  const closeButton = document.getElementById("muralLightboxClose");

  if (!photos.length || !lightbox || !lightboxImage) return;


  /* ==========================================
     ABRIR FOTO
  ========================================== */

  photos.forEach((photo) => {

    photo.addEventListener("click", () => {

      const image = photo.dataset.image;

      if (!image) return;

      lightboxImage.src = image;

      lightbox.classList.add("active");

      lightbox.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

    });

  });


  /* ==========================================
     FECHAR
  ========================================== */

  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    setTimeout(() => {
      lightboxImage.src = "";
    }, 350);

  }


  closeButton.addEventListener("click", closeLightbox);


  /* ==========================================
     CLICAR FORA DA FOTO
  ========================================== */

  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  /* ==========================================
     ESC PARA FECHAR
  ========================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }

  });

});
</script>