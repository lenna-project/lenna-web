<script setup></script>

<template>
    <div class="konnektoren-promo">
        <div class="promo-header">
            <h2>Check Out Konnektoren</h2>
        </div>
        <div class="promo-content">
            <div class="promo-description">
                <p>
                    <strong>Learn German grammar effortlessly!</strong>
                    Konnektoren helps you master German grammar through
                    interactive lessons, personalized learning paths, and
                    verifiable credential badges to showcase your achievements.
                </p>
                <ul class="feature-list">
                    <li>🌍 Multiple language platforms (DE, EN, ES)</li>
                    <li>🎯 Interactive lessons with real-time feedback</li>
                    <li>🏆 Earn verifiable credential badges</li>
                    <li>📊 Track your progress with intuitive dashboards</li>
                </ul>
                <a
                    href="https://konnektoren.help"
                    target="_blank"
                    class="cta-button"
                >
                    Start Learning German Today →
                </a>
            </div>
        </div>
        <div class="promo-footer">
            <p>Available for desktop and web • Mobile apps coming soon</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.konnektoren-promo {
    margin: 2rem auto;
    padding: 1.5rem;
    border-radius: 10px;
    background: linear-gradient(145deg, $secondary_color, $primary_color);
    color: white;
    box-shadow: 10px 5px 5px $shadow;
    max-width: 800px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.promo-header h2 {
    font-family: "Amatic SC", cursive;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: bold;
}

.promo-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.promo-description p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.5;
}

.feature-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
}

.feature-list li {
    padding: 0.5rem 0;
}

.cta-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: $button_color;
    color: $text_color;
    text-decoration: none;
    border-radius: 30px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.cta-button:hover {
    transform: scale(1.05);
    background-color: $button_color;
}

.promo-footer {
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0.9;
}

@media screen and (max-width: 800px) {
    .konnektoren-promo {
        margin: 1rem;
        padding: 1rem;
    }

    .feature-list {
        grid-template-columns: 1fr;
    }
}
</style>
