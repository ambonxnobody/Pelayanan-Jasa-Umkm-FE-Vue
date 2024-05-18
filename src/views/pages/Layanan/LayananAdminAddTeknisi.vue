<template>
    <div>
        <button class="btn btn-primary" @click="showModal = true">Tambah</button>
        <BaseModal v-if="showModal" ref="baseModal" @close="showModal = false">
            <template v-slot:header>
                <h2 class="modal-title">Form Data</h2>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </template>
            <template v-slot:body>
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="pesan">
                            <div class="mb-3">
                                <label class="form-label">Nama</label>
                                <select v-model="nama" class="form-select" @change="setRole">
                                    <option value="" disabled selected>Pilih Role</option>
                                    <option v-for="option in namaOption" :key="option.value" :value="option.value">
                                        {{ option.label }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <input v-model="username" class="form-control" type="text" name="username"
                                    placeholder="Username" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">No.Telp</label>
                                <input v-model="no_telp" class="form-control" type="text" name="no_telp"
                                    placeholder="No.Telp" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input v-model="password" class="form-control" type="password" name="password"
                                    placeholder="Password" />
                            </div>
                            <div class="mb-3">
                                <input hidden v-model="role" class="form-control" type="text" name="role"
                                    placeholder="Role" />
                            </div>
                        </form>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <button class="btn btn-primary" @click="pesan">Submit</button>
            </template>
        </BaseModal>
    </div>

    <div class="container-fluid p-0 mt-5">
        <h1 class="h3 mb-3 text-center"><strong>Tambah User</strong></h1>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center">No</th>
                                    <th class="text-center">Nama</th>
                                    <th class="text-center">Username</th>
                                    <th class="text-center">No.Telp</th>
                                    <th class="text-center action-column">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in getUser" :key="user.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.username }}</td>
                                    <td>{{ user.no_telp }}</td>
                                    <td class="d-flex">
                                        <div class=" col-4"> <button class="btn btn-warning mr-2"
                                                @click="editUser(index)">Edit</button>
                                        </div>
                                        <div class=" col-4"> <button class="btn btn-danger"
                                                @click="deleteUser(index)">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseModal from '../../../components/Modal.vue';
import feather from "feather-icons";
import axios from 'axios';
export default {
    name: "LayananAdminAddTeknisi",
    mounted() {
        this.getData();
        feather.replace();
    },
    components: {
        BaseModal,
    },
    data() {
        return {
            showModal: false,
            id: null,
            nama: '',
            namaOption: [
                { label: 'Pelanggan', value: 'Pelanggan' },
                { label: 'Teknisi', value: 'Teknisi' }
            ],
            username: '',
            no_telp: '',
            password: '',
            role: '',
            getUser: []
        };
    },
    methods: {
        async getData() {
            try {
                const response = await axios.get('http://localhost:8000/api/get-user');
                this.getUser = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        closeModal() {
            this.id = null;
            this.nama = '';
            this.username = '';
            this.no_telp = '';
            this.password = '';
            this.role = '';
            this.$refs.baseModal.close();
        },
        editUser(index) {
            const user = this.getUser[index];
            this.id = user.id;
            this.nama = user.name;
            this.username = user.username;
            this.no_telp = user.no_telp;
            this.password = '';
            this.role = user.role;
            this.showModal = true;
        },
        deleteUser(index) {
            const user = this.getUser[index];
            const userId = user.id;
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Anda tidak akan dapat mengembalikan tindakan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus saja!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8000/api/submit-delete-user/${userId}`)
                        .then(response => {
                            console.log(response.data);
                            const deletedDataMessage = "Data pengguna berhasil dihapus.";
                            Swal.fire('Success', deletedDataMessage, 'success');
                            this.getUser.splice(index, 1);
                        })
                        .catch(error => {
                            console.error(error);
                            Swal.fire('Error', 'Terjadi kesalahan saat menghapus data', 'error');
                        });
                }
            });
        },

        pesan() {
            const endpoint = this.id ? `http://localhost:8000/api/submit-update-user/${this.id}` : 'http://localhost:8000/api/submit-user';
            const method = this.id ? 'put' : 'post';
            axios[method](endpoint, {
                nama: this.nama,
                username: this.username,
                password: this.password,
                no_telp: this.no_telp,
                role: this.role
            }).then(response => {
                console.log(response.data);
                const savedDataMessage = `Data berhasil ${this.id ? 'diubah' : 'disimpan'}`;
                Swal.fire('Success', savedDataMessage, 'success');
                this.closeModal();
                this.getData();
            }).catch(error => {
                console.error(error);
                Swal.fire('Error', 'Terjadi kesalahan saat menyimpan data', 'error');
            });
        },
        setRole() {
            if (this.nama === 'Pelanggan') {
                this.role = '3';
            } else if (this.nama === 'Teknisi') {
                this.role = '2';
            } else {
                this.role = '';
            }
        },
    },
};
</script>

<style>
.action-column {
    white-space: nowrap;
    width: 200px;
}
</style>
