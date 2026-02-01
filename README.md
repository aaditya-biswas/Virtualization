---
title: Untitled Document 1
---

# Virtualization
Deploying a RESTful API/ Service over multiple virtual machines.


## Installation of HyperVisor
To install Virtual Machines we would require a hypervisor, such as VirtualBox, VmWorkstationPlayer etc. So first install the hypervisor in your local desktop. After installing VirtualBox you should get this
![Virtual Box Startup](https://github.com/aaditya-biswas/Virtualization/blob/main/img/VirtualBoxStart.png)

## Installation of Virtual Machines
To install Virtual Machines we would require a .iso image file. This is an image of the operating system which can be run to create a virtual machines. I have provided some links below to the .iso files that I have used , however you are free to downlaod iso file of any operating system that you wish for. Also these VM's consume memory and space , so it is suggested to choose a lightweight OS, which has the basic functionalites. I am using MiniOS. Also I recommend you using a linux distro since I will be writing commands in bash.

## Configuration of Virtual Machines
You will be prompted with a page to enter the details of the virtual machine. Choose any name for your VM and select the iso file you downloaded. To configure the VMs, provide a reasonable memory (RAM) and storage according to the OS needs. Here I have allocated 1.5 GB to each VM, along with 15 GB Memory. This would be sufficient for our purpose. After that click ok and proceed with the installation. Now after installation you will see that you will have a VM instance. Now power on the VM instance.

**Crucially, we need to change the network configuration for both VMs.**
Go to **Machine Settings** for each VM.
1.  Navigate to the **Network** section.
2.  For **Adapter 1**, ensure "Enable Network Adapter" is checked.
3.  Change the "Attached to:" dropdown from `NAT` to **Host-only Adapter**.
4.  For "Name:", select or create a Host-only Network (e.g., `vboxnet0`). If none exists, VirtualBox will prompt you to create one. This type of network creates a virtual cable between your host machine and the VMs, allowing them to communicate directly with each other and with the host, but isolating them from your external LAN.
5.  Repeat these steps for **all** your VM instances.

## Installing necessary packages
After configuring the hardware configurations of the VM, now run your VM. After it has loaded up we need to install the necessary packages. Now run

`sudo apt update`

After that run

`sudo apt upgrade`

Finally

`sudo apt install`

Now we have installed the system packages. Now it's time to install Node.js and its package manager npm. Node.js is a popular Javascript runtime library which will allow us to host our application on the VM.

Run

`sudo apt install nodejs npm`

## Configuring Network and Verifying Connectivity
With the Host-only Adapter configured, we now need to assign static IP addresses to our VMs so they can communicate on the same subnet.

1.  **Start all Virtual Machines**: Power on both VM instances.
2.  **Identify Network Interface**: Once each VM has booted up, open a terminal. We need to identify the network interface associated with the Host-only Adapter. Run `ip a`. You will typically see an interface like `enp0s8` (or similar, different from `enp0s3` which usually handles NAT). This interface will likely not have an IP address yet.Enter the Network Configuration and change the Network Type from NAT to inet and also enable the virtual connection.

3.  **Set Static IP Addresses**: For each VM, we will manually assign an IP address on the same subnet.
    *   **For VM1 (e.g., your server VM)**:
        `sudo ip addr add 192.168.56.10/24 dev enp0s8`
    *   **For VM2 (e.g., your client VM, or another server VM)**:
        `sudo ip addr add 192.168.56.11/24 dev enp0s8`

    *Replace `enp0s8` with the actual name of your Host-only network interface if it's different.* The `/24` denotes the subnet mask (255.255.255.0), placing both VMs on the `192.168.56.x` subnet.

4.  **Verify IP Addresses**: After setting the IPs, run `ip a` again on both VMs. You should now see the assigned IP addresses (`192.168.1.1` and `192.168.1.2`) listed under their respective interfaces.

5.  **Test Connectivity (Ping)**: From VM1, try to `ping` VM2's IP address, and vice versa.
    *   From VM1: `ping 192.168.56.11`
    *   From VM2: `ping 192.168.56.10`

    If the `ping` commands are successful, you will see replies, confirming that your VMs can communicate over the configured Host-only network.

## Creating and Deploying the RESTful API Service
Now that network connectivity is established, let's set up and run the `superMarket.js` RESTful API service on one of your VMs (we'll designate VM1 as the server).

1.  **Create a Project Directory**: On VM1 (your designated server VM), open a terminal and create a folder named `scripts`.
    `mkdir scripts`
    `cd scripts`

2.  **Initialize Node.js Project**: Initialize a new Node.js project within the `scripts` directory.
    `npm init -y`
    This command creates a `package.json` file with default values.

3.  **Install Express**: Install the Express framework locally into your project.
    `npm install express`

4.  **Download `superMarket.js` Script**: Download the `superMarket.js` script from the provided repository into your `scripts` directory.
    `wget https://raw.githubusercontent.com/aaditya-biswas/Virtualization/superMarket.js`

    *If `wget` is not installed, you can install it with `sudo apt install wget`.*

5.  **Run the API Service**: Execute the `superMarket.js` script using Node.js.
    `node superMarket.js`

    You should see the message: `SuperMarket API listening at http://0.0.0.0:3000`. This indicates your API server is running on VM1, listening on port `3000`.

## Testing the API Service from the Client
Now that the API is running on VM1, we can access it from your host machine's web browser, which is connected to the same Host-only network.

1.  **Open Browser on Host Machine**: On your physical desktop (the host machine), open your preferred web browser (e.g., Chrome, Firefox).

2.  **Access the API**: In the browser's address bar, type the IP address of your server VM (VM1) followed by the port and an API endpoint.
    *   To access the root endpoint: `http://192.168.1.1:3000/`

This confirms that your RESTful API service is successfully deployed on a virtual machine, configured with a static IP on a Host-only network, and is accessible from your host machine's browser. You can also test VM-to-VM communication by running `curl http://192.168.56.10:3000/products` from VM2's terminal.

### 3 virtual machines were making the device lag
