# Virtualization
Deploying a RESTful API/ Service over multiple virtual machines


## Installation of HyperVisor
To install Virtual Machines we would require a hypervisor, such as VirtualBox, VmWorkstationPlayer etc. So first install the hypervisor in your local desktop

## Installation of Virtual Machines
To install Virtual Machines we would require a .iso image file. This is an image of the operating system which can be run to create a virtual machines. I have provided some links below to the .iso files that I have used , however you are free to downlaod iso file of any operating system that you wish for. Also these VM's consume memory and space , so it is suggested to choose a lightweight OS, which has the basic functionalites. I am using MiniOS. Also I recommend you using a linux distro since I will be writing commands in bash.

## Configuration of Virtual Machines
You will be prompted with a page to enter the details of the virual machine. Choose any name for your virtual machine and select the iso file you downloaded .To configure the Virtual Machines, provide a reasonable memory (RAM) and storage according to the OS needs. Here I have allocated 1.5 GB to each VM, along with 15 GB Memory. This would be sufficient for our purpose. After that click ok and proceed with the installation. Now after installation you will see that you will have a VM instance. Now power on the VM instance. After that go to Machine Settings. Then make sure that the dropdown is selected to NAT. This assigns a unique IP to each of the Virtual Machines so that they can communicate with each other, however these all virtual machines appear as the host machine in the local LAN. Hence these machines are isolated from the local LAN. 

## Installing necessary packages
After configuring the hardware configurations of the VM, now run your VM. After it has loaded up we need to install the necessary packages. Now run 
`sudo apt update`
After that run
`sudo apt upgrade`
Finally 
`sudo apt install`

Now we have installed the system packages. Now it's time to install Node.js and it's package manager npm. Node.js is a popular Javascript runtime library which will allow us to host our application on the Virtual Machine.

Run
`sudo apt install nodejs npm`
We will also be using express for the backend of our code

Run
`npm install express`

## Cloning the Virtual Machine
