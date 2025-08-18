<template>
  <!-- Enhanced Burger Menu Icon -->
  <div class="mobile-menu-wrapper">
    <div class="menu-icon" @click="toggleMenu" :class="{ active: isMenuOpen }">

      <div class="burger-lines">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>

    <!-- Enhanced Mobile Menu -->
    <transition name="slide-menu">
      <div v-if="isMenuOpen" class="box-phone" :class="{ open: isMenuOpen }">
        <div class="menu-header">
          <h3 class="menu-title">Menu</h3>
          <button class="close-btn" @click="toggleMenu">×</button>
        </div>
        
        <ul class="links ul-phone">
          <li class="menu-item">
            <NuxtLink
              to="/"
              exact-active-class="active"
              class="menu-link"
              @click="toggleMenu"
            >
              <PuplicIconHome class="menu-icon-svg" />
              <span class="menu-text">Home</span>
            </NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink
              to="/myOrders"
              exact-active-class="active"
              class="menu-link"
              @click="toggleMenu"
            >
              <PuplicIconBagTic class="menu-icon-svg" />
              <span class="menu-text">My Orders</span>
            </NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink
              to="/services"
              exact-active-class="active"
              class="menu-link"
              @click="toggleMenu"
            >
              <ServicesIcon class="menu-icon-svg" />
              <span class="menu-text">Services</span>
            </NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink
              to="/offers"
              exact-active-class="active"
              class="menu-link"
              @click="toggleMenu"
            >
              <PuplicIconOfferIcon class="menu-icon-svg" />
              <span class="menu-text">Offers</span>
            </NuxtLink>
          </li>
          <li class="menu-item">
            <NuxtLink
              to="/spareParts"
              exact-active-class="active"
              class="menu-link"
              @click="toggleMenu"
            >
              <PuplicIconSparePart class="menu-icon-svg" />
              <span class="menu-text">Spare Parts</span>
            </NuxtLink>
          </li>
        </ul>
        
        <div class="menu-footer">
          <ProfileCard />
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup>
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu when route changes
const route = useRoute();
watch(() => route.path, () => {
  isMenuOpen.value = false;
});
</script>

<style scoped>
/* Mobile Menu Wrapper */
.mobile-menu-wrapper {
  position: relative;
  z-index: 1000;
}

/* Enhanced Burger Menu Icon */
.menu-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 230, 84, 0.2);
  display: none;
}

.menu-icon:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 230, 84, 0.4);
}

/* Burger Lines */
.burger-lines {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  width: 100%;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
}

/* Burger Animation */
.menu-icon.active .line1 {
  transform: rotate(45deg) translate(6px, 6px);
  background: #ff4757;
}

.menu-icon.active .line2 {
  opacity: 0;
  transform: scaleX(0);
}

.menu-icon.active .line3 {
  transform: rotate(-45deg) translate(6px, -6px);
  background: #ff4757;
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 800;
  backdrop-filter: blur(5px);
}

/* Enhanced Mobile Menu */
.box-phone {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: linear-gradient(135deg, #fdfdff 0%, #f8f9fa 100%);
  z-index: 900;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 1px solid rgba(255, 230, 84, 0.3);
}

/* Menu Header */
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  background: rgba(255, 230, 84, 0.1);
  border-bottom: 1px solid rgba(255, 230, 84, 0.2);
}

.menu-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6c757d;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  transform: rotate(90deg);
}

/* Menu Links */
.ul-phone {
  flex: 1;
  padding: 20px 0;
  margin: 0;
  list-style: none;
}

.menu-item {
  margin-bottom: 5px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 0 25px 25px 0;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
}

.menu-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 230, 84, 0.1), transparent);
  transition: left 0.5s ease;
}

.menu-link:hover::before {
  left: 100%;
}

.menu-link:hover {
  background: rgba(255, 230, 84, 0.1);
  color: #2c3e50;
  transform: translateX(10px);
  box-shadow: 0 4px 15px rgba(255, 230, 84, 0.2);
}

.menu-link.active {
  background: linear-gradient(135deg, #ffe654, #ffcd3c);
  color: #2c3e50;
  font-weight: 600;
  transform: translateX(10px);
  box-shadow: 0 6px 20px rgba(255, 230, 84, 0.3);
}

.menu-icon-svg {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.menu-link:hover .menu-icon-svg {
  transform: scale(1.1);
}

.menu-text {
  font-size: 1rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.3s ease;
}

/* Menu Footer */
.menu-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 230, 84, 0.2);
  background: rgba(255, 230, 84, 0.05);
}

/* Slide Menu Transitions */
.slide-menu-enter-active,
.slide-menu-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-menu-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-menu-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-menu-enter-to,
.slide-menu-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* Responsive Design */

/* Mobile Devices (≤768px) */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }
}

/* Mobile Devices (≤576px) */
@media (max-width: 576px) {
  .menu-icon {
    top: 15px;
    right: 15px;
    padding: 10px;
  }

  .box-phone {
    width: 280px;
  }

  .menu-header {
    padding: 20px 15px;
  }

  .menu-title {
    font-size: 1.3rem;
  }

  .menu-link {
    padding: 12px 15px;
    gap: 12px;
  }

  .menu-text {
    font-size: 0.9rem;
  }

  .menu-icon-svg {
    width: 20px;
    height: 20px;
  }

  .menu-footer {
    padding: 15px;
  }
}

/* Large Mobile Devices (577px - 768px) */
@media (min-width: 577px) and (max-width: 768px) {
  .box-phone {
    width: 300px;
  }

  .menu-link {
    padding: 14px 18px;
  }

  .menu-text {
    font-size: 0.95rem;
  }
}

/* Tablet Landscape (769px - 991px) */
@media (min-width: 769px) and (max-width: 991px) {
  .menu-icon {
    display: none;
  }
}

/* Desktop (≥992px) */
@media (min-width: 992px) {
  .menu-icon {
    display: none;
  }
}

/* Animation Enhancements */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Menu Item Stagger Animation */
.menu-item {
  animation: slideInLeft 0.3s ease-out;
}

.menu-item:nth-child(1) { animation-delay: 0.1s; }
.menu-item:nth-child(2) { animation-delay: 0.2s; }
.menu-item:nth-child(3) { animation-delay: 0.3s; }
.menu-item:nth-child(4) { animation-delay: 0.4s; }
.menu-item:nth-child(5) { animation-delay: 0.5s; }

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
