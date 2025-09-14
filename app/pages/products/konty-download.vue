<template>
  <div>
    <!-- Hero Section -->
    <UPageHero
      title="Download Konty"
      description="Get started with Konty on your preferred platform. Choose between our production app for your business or try our demo app to explore features."
    />

    <!-- Download Sections Container -->
    <UContainer class="py-16 lg:py-24">
      <div class="grid gap-16 lg:gap-24">

        <!-- Production App Section -->
        <section>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Production App</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Ready to run your business with Konty
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Web -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-heroicons-globe-alt" class="w-16 h-16 mx-auto text-primary" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Web App</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Access from any browser
                </p>
                <UButton
                  label="Open Web App"
                  icon="i-heroicons-arrow-top-right-on-square"
                  color="primary"
                  block
                  to="https://app.konty.app"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- Windows -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-windows" class="w-16 h-16 mx-auto text-primary" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Windows</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Windows 10 and above
                </p>
                <UButton
                  label="Download .exe"
                  icon="i-heroicons-arrow-down-tray"
                  color="primary"
                  block
                  to="https://downloads.konty.app/windows/konty-setup.exe"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- Android -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-android" class="w-16 h-16 mx-auto text-primary" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Android</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Android 7.0 and above
                </p>
                <UButton
                  label="Download .apk"
                  icon="i-heroicons-arrow-down-tray"
                  color="primary"
                  block
                  to="https://downloads.konty.app/android/konty.apk"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- macOS -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-apple" class="w-16 h-16 mx-auto text-primary" />
                </div>
                <h3 class="text-xl font-semibold mb-2">macOS</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  macOS 11 and above
                </p>
                <UButton
                  label="Download .dmg"
                  icon="i-heroicons-arrow-down-tray"
                  color="primary"
                  block
                  to="https://downloads.konty.app/macos/konty.dmg"
                  target="_blank"
                />
              </div>
            </UCard>
          </div>
        </section>

        <!-- Demo App Section -->
        <section>
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Demo App</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Explore Konty features with sample data
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Web -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-heroicons-globe-alt" class="w-16 h-16 mx-auto text-gray-500" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Web Demo</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Try in your browser
                </p>
                <UButton
                  label="Open Demo"
                  icon="i-heroicons-arrow-top-right-on-square"
                  variant="outline"
                  block
                  to="https://demo.konty.app"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- Windows -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-windows" class="w-16 h-16 mx-auto text-gray-500" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Windows Demo</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Windows 10 and above
                </p>
                <UButton
                  label="Download Demo"
                  icon="i-heroicons-arrow-down-tray"
                  variant="outline"
                  block
                  to="https://downloads.konty.app/demo/windows/konty-demo-setup.exe"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- Android -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-android" class="w-16 h-16 mx-auto text-gray-500" />
                </div>
                <h3 class="text-xl font-semibold mb-2">Android Demo</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Android 7.0 and above
                </p>
                <UButton
                  label="Download Demo"
                  icon="i-heroicons-arrow-down-tray"
                  variant="outline"
                  block
                  to="https://downloads.konty.app/demo/android/konty-demo.apk"
                  target="_blank"
                />
              </div>
            </UCard>

            <!-- macOS -->
            <UCard>
              <div class="text-center p-6">
                <div class="mb-4">
                  <UIcon name="i-simple-icons-apple" class="w-16 h-16 mx-auto text-gray-500" />
                </div>
                <h3 class="text-xl font-semibold mb-2">macOS Demo</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  macOS 11 and above
                </p>
                <UButton
                  label="Download Demo"
                  icon="i-heroicons-arrow-down-tray"
                  variant="outline"
                  block
                  to="https://downloads.konty.app/demo/macos/konty-demo.dmg"
                  target="_blank"
                />
              </div>
            </UCard>
          </div>
        </section>

      </div>

      <!-- Additional Info -->
      <div class="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-4">System Requirements</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            <div>
              <h4 class="font-medium mb-2">Desktop Requirements</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Windows 10 or later / macOS 11 or later</li>
                <li>• 4GB RAM minimum (8GB recommended)</li>
                <li>• 500MB available storage</li>
                <li>• Internet connection required</li>
              </ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">Mobile Requirements</h4>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Android 7.0 (API level 24) or later</li>
                <li>• 2GB RAM minimum</li>
                <li>• 200MB available storage</li>
                <li>• Internet connection required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Download Konty - POS Software for All Platforms',
  description: 'Download Konty POS software for Web, Windows, Android, and macOS. Get the production app for your business or try our demo app to explore features.',
})
</script>
