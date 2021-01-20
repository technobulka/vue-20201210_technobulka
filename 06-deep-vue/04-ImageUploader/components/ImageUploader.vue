<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="background"
      @click="handleImage($event)"
    >
      <span v-if="imageId">Удалить изображение</span>
      <span v-else-if="loading">Загрузка...</span>
      <span v-else>Загрузить изображение</span>
      <input
        type="file"
        accept="image/*"
        ref="fileupload"
        class="form-control-file"
        @change="uploadImage($event)"
        :disabled="loading"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    background() {
      if (this.imageId) {
        let url = ImageService.getImageURL(this.imageId);
        return `--bg-image: url('${url}')`;
      }

      return null;
    },
  },

  methods: {
    uploadImage(e) {
      this.loading = true;

      ImageService.uploadImage(e.target.files[0])
        .then((res) => {
          if (res.id) {
            this.$emit('change', res.id);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleImage(e) {
      if (this.imageId) {
        this.$emit('change', null);
        this.$refs.fileupload.value = null;
        e.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
